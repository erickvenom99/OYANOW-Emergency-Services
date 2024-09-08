import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Provider from "./ServiceProvider";
import User from "./User";
import Order from "./Order";
import bcrypt from "bcryptjs";
import http from "http";
import socketHandler from "./socket";

const axios = require('axios');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketHandler(server);

mongoose
  .connect("mongodb://localhost:27017/oyanow")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/service-providers/sign-up", async (req: Request, res: Response) => {
  try {
    const { name, username, email, password, phoneNumber, country, address, city, state, zipcode } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    // Construct full address for geocoding
    const fullAddress = `${address}, ${city}, ${state}, ${country}, ${zipcode}`;
    const apiKey = "8l_Oc_6LxfO8c8pPomyMBL-5Tap9jrt_ZFKH_os6gO4"; // Replace with your HERE Maps API key

    // Get coordinates from the address
    const geocodeResponse = await axios.get(`https://geocode.search.hereapi.com/v1/geocode`, {
      params: {
        q: fullAddress,
        apiKey: apiKey
      }
    });

    if (geocodeResponse.data.items.length === 0) {
      return res.status(400).send({ error: 'Unable to geocode address' });
    }

    const { position } = geocodeResponse.data.items[0];
    const { lat, lng } = position;
    const provider = new Provider({ ...req.body, passwordHash, location: {
    country,
    address,
    city,
    state,
    zipcode,
    coordinates: {
    type: 'Point',
    coordinates: [lng, lat],
    },
    },
    });
    await provider.save();
    res.status(201).send(provider);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/service-providers/login", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const provider = await Provider.findOne({ $or: [{ username }, { email }] });
    if (!provider) {
      return res.status(400).send("invalid username/email");
    }

    const isMatch = await bcrypt.compare(password, provider.passwordHash);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // If password is correct
    res.status(200).send({
      id: provider._id,
      username: provider.username,
      name: provider.name,
      email: provider.email,
      coordinates: provider.location?.coordinates,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/user/sign-up", async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ ...req.body, passwordHash });
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/user/login", async (req: Request, res: Response) => {
  try {
    const { username, email, phoneNumber, password } = req.body;
    const user = await User.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });
    if (!user) {
      return res.status(400).send("invalid username/email");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // If password is correct
    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      coordinates: user.location?.coordinates,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/orders", async (req: Request, res: Response) => {
  try {
    const { userId, providerId, orderId, coordinates } = req.body;
    const order = new Order({
      user: userId,
      provider: providerId,
      orderId,
      coordinates,
    });
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});
// Route to accept an order by the service provider
app.post("/orders/:orderId/accept", async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status: "accepted" },
      { new: true }
    );
    if (!order) return res.status(404).send("Order not found");
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/orders/:orderId/location", async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { coordinates } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId },
      { coordinates, status: "in-progress" },
      { new: true }
    );
    if (!order) return res.status(404).send("Order not found");

    io.emit("locationUpdate", {
      orderId,
      coordinates,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
