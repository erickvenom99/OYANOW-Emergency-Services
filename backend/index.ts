import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Provider from "./ServiceProvider";
import User, { IUser } from "./User";
import Order from "./Order";
import bcrypt from "bcryptjs";
import http from "http";
import socketHandler from "./socket";
import axios from 'axios';

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true // Allow cookies and credentials
}));
app.use(express.json());

const server = http.createServer(app);
const io = socketHandler(server); // Initialize Socket.IO

// Declare io globally for usage in routes
let socketIO = io;

mongoose
  .connect("mongodb://localhost:27017/oyanow")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Service Provider Sign-Up
app.post("/service-providers/sign-up", async (req: Request, res: Response) => {
  try {
    const { name, username, email, password, phoneNumber, services, coordinates } = req.body; // Adjusted to accept coordinates

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create provider document with coordinates
    const provider = new Provider({
      name,
      username,
      email,
      phoneNumber,
      passwordHash,
      location: {
        type: 'Point',
        coordinates: coordinates || [0, 0], // Default to [0, 0] if coordinates are not provided
      },
      services: services || [], // Set this based on your requirements
    });

    await provider.save();
    const locationCoordinates = provider.location ? provider.location.coordinates : null;
    res.status(201).send({
    userId: provider._id,
    username: provider.username,
    services: provider.services,
    coordinates: locationCoordinates,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Service Provider Login
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
      userId: provider._id,
      username: provider.username,
      name: provider.name,
      email: provider.email,
      coordinates: provider.location?.coordinates,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User Sign-Up
app.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const { username, email, phoneNumber, password, coordinates } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user document with coordinates
    const user = new User({
      username,
      email,
      phoneNumber,
      passwordHash,
      location: {
        type: 'Point',
        coordinates: coordinates || [0, 0], // Default to [0, 0] if coordinates are not provided
      },
    });

    await user.save();
    console.log("user saved");
    // If password is correct
    res.status(200).send({
      userId: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      coordinates: user.location.coordinates, // This should now work without error
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// User Login
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, email, phoneNumber, password } = req.body;
    const user: IUser | null = await User.findOne({
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
      userId: user._id,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      coordinates: user.location?.coordinates,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create Order
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

// Accept Order
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

// Update Order Location
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

    // Emit location update to all connected clients
    socketIO.emit("locationUpdate", {
      orderId,
      coordinates,
    });

    res.status(200).send(order); // Respond with the updated order
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});