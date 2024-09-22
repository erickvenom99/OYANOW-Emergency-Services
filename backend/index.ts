import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Provider, { IServiceProvider } from "./ServiceProvider/ServiceProvider";
import User, { IUser } from "./User/User";
import Order from "./Order/Order";
import Notification from "./Notification/Notification"
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
    const { name, username, email, password, phoneNumber, services, coordinates } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const provider = new Provider({
      name,
      username,
      email,
      phoneNumber,
      passwordHash,
      location: {
        type: 'Point',
        coordinates: coordinates || [0, 0],
      },
      services: services || [],
    });

    await provider.save();
    res.status(201).send({
      providerId: provider._id,
      username: provider.username,
      services: provider.services,
      coordinates: provider.location.coordinates, // Ensure this is accessed correctly
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


// Service Provider Login
app.post("/service-providers/login", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    
    const provider : IServiceProvider | null = await Provider.findOne({ $or: [{ username }, { email }] });
    if (!provider) {
      return res.status(400).send("invalid username/email");
    }

    const isMatch = await bcrypt.compare(password, provider.passwordHash);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }
    console.log("API Response:", provider.location.coordinates);
    const uniqueUsername = provider.username + "-" + provider._id.slice(0, 4);
    // If password is correct
    res.status(200).send({
      providerId: provider._id,
      username: provider.username,
      name: provider.name,
      email: provider.email,
      coordinates: provider.location.coordinates,
      uniqueUsername: uniqueUsername,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch Notifications for a Provider
app.get("/notifications/:providerId", async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;

    // Fetch notifications for the specific provider
    const notifications = await Notification.find({ providerId }).sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).send(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Get Providers by Service Type Sorted by Proximity
app.get("/api/providers", async (req: Request, res: Response) => {
  const { service } = req.query;
  const longitude = parseFloat(req.query.longitude as string); // Expecting coordinates in query params 
  const latitude = parseFloat(req.query.latitude as string); // Expecting coordinates in query params

  if (!service || !longitude || !latitude) {
    return res.status(400).send("Service type and coordinates are required.");
  }

  try {
    const providers = await Provider.find({
      services: service, // Filter by service type
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 100000, // Max distance in meters (10 km)
        },
      },
    })
    .select("name username email phoneNumber location"); // Select fields to return

    res.status(200).send(providers);
  } catch (error) {
    console.error("Error retrieving providers:", error);
    res.status(500).send("Internal Server Error");
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
app.post("/orders/create-order", async (req: Request, res: Response) => {
  console.log("Request Body:", req.body);
  try {
    const { userId, providerId, location } = req.body;
    const { coordinates } = location;
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return res.status(400).send("Invalid coordinates format.");
  }
    const order = new Order({
      user: userId,
      provider: providerId,
      status: "pending",
      location: {
        type: 'Point',
        coordinates: coordinates || [0, 0],
      },
    });
    await order.save();
    const orderId = order._id; 
      // Create a notification for the provider
      const notification = new Notification({
        providerId,
        message: `You have a new order (Order ID: ${orderId}). Please check your dashboard for details.`,
        orderId,
      });
      await notification.save(); // Save the notification to the database
      socketIO.emit("newOrder", {
        providerId,
        orderId,
        message: `You have a new order (Order ID: ${orderId}).`,
      });
  
      console.log('Notification sent to provider:', providerId);
  
      res.status(201).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
});

//Accept Order
app.post("/orders/:orderId/accept", async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ $or: [{ user: "orderId" }] });

    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update Order Location
// app.put("/orders/:orderId/location", async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.params;
//     const { coordinates } = req.body;
//     const order = await Order.findOneAndUpdate(
//       { orderId },
//       { coordinates, status: "in-progress" },
//       { new: true }
//     );
//     if (!order) return res.status(404).send("Order not found");

//     // Emit location update to all connected clients
//     socketIO.emit("locationUpdate", {
//       orderId,
//       coordinates,
//     });

//     res.status(200).send(order); // Respond with the updated order
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});