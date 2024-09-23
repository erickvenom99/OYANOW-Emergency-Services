"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const ServiceProvider_1 = __importDefault(require("./ServiceProvider/ServiceProvider"));
const User_1 = __importDefault(require("./User/User"));
const Order_1 = __importDefault(require("./Order/Order"));
const Notification_1 = __importDefault(require("./Notification/Notification"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./socket"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true // Allow cookies and credentials
}));
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = (0, socket_1.default)(server); // Initialize Socket.IO
// Declare io globally for usage in routes
let socketIO = io;
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/oyanow")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
// Service Provider Sign-Up
app.post("/service-providers/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, phoneNumber, services, coordinates } = req.body;
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
        const provider = new ServiceProvider_1.default({
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
        yield provider.save();
        res.status(201).send({
            providerId: provider._id,
            username: provider.username,
            services: provider.services,
            coordinates: provider.location.coordinates, // Ensure this is accessed correctly
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Service Provider Login
app.post("/service-providers/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const provider = yield ServiceProvider_1.default.findOne({ $or: [{ username }, { email }] });
        if (!provider) {
            return res.status(400).send("invalid username/email");
        }
        const isMatch = yield bcryptjs_1.default.compare(password, provider.passwordHash);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }
        console.log("API Response:", provider.location.coordinates);
        const uniqueUsername = provider.username + "-" + provider._id.toString().toString().slice(0, 4);
        // If password is correct
        res.status(200).send({
            providerId: provider._id,
            username: provider.username,
            name: provider.name,
            email: provider.email,
            coordinates: provider.location.coordinates,
            uniqueUsername: uniqueUsername,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Fetch Notifications for a Provider
app.get("/notifications/:providerId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { providerId } = req.params;
        // Fetch notifications for the specific provider
        const notifications = yield Notification_1.default.find({ providerId }).sort({ createdAt: -1 }); // Sort by newest first
        res.status(200).send(notifications);
    }
    catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).send("Internal Server Error");
    }
}));
// Get Providers by Service Type Sorted by Proximity
app.get("/api/providers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { service } = req.query;
    const longitude = parseFloat(req.query.longitude); // Expecting coordinates in query params 
    const latitude = parseFloat(req.query.latitude); // Expecting coordinates in query params
    if (!service || !longitude || !latitude) {
        return res.status(400).send("Service type and coordinates are required.");
    }
    try {
        const providers = yield ServiceProvider_1.default.find({
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
    }
    catch (error) {
        console.error("Error retrieving providers:", error);
        res.status(500).send("Internal Server Error");
    }
}));
// User Sign-Up
app.post("/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, phoneNumber, password, coordinates } = req.body;
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
        // Create user document with coordinates
        const user = new User_1.default({
            username,
            email,
            phoneNumber,
            passwordHash,
            location: {
                type: 'Point',
                coordinates: coordinates || [0, 0], // Default to [0, 0] if coordinates are not provided
            },
        });
        yield user.save();
        console.log("user saved");
        // If password is correct
        res.status(200).send({
            userId: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            coordinates: user.location.coordinates, // This should now work without error
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// User Login
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { username, email, phoneNumber, password } = req.body;
        const user = yield User_1.default.findOne({
            $or: [{ username }, { email }, { phoneNumber }],
        });
        if (!user) {
            return res.status(400).send("invalid username/email");
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).send("Invalid password");
        }
        // If password is correct
        res.status(200).send({
            userId: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            coordinates: (_a = user.location) === null || _a === void 0 ? void 0 : _a.coordinates,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Create Order
app.post("/orders/create-order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Request Body:", req.body);
    try {
        const { userId, providerId, location } = req.body;
        const { coordinates } = location;
        if (!Array.isArray(coordinates) || coordinates.length !== 2) {
            return res.status(400).send("Invalid coordinates format.");
        }
        const order = new Order_1.default({
            user: userId,
            provider: providerId,
            status: "pending",
            location: {
                type: 'Point',
                coordinates: coordinates || [0, 0],
            },
        });
        yield order.save();
        const orderId = order._id;
        // Create a notification for the provider
        const notification = new Notification_1.default({
            providerId,
            message: `You have a new order (Order ID: ${orderId}). Please check your dashboard for details.`,
            orderId,
        });
        yield notification.save(); // Save the notification to the database
        socketIO.emit("newOrder", {
            providerId,
            orderId,
            message: `You have a new order (Order ID: ${orderId}).`,
        });
        console.log('Notification sent to provider:', providerId);
        res.status(201).send({
            orderId: order._id,
            coordinates: (_a = order.coordinates) === null || _a === void 0 ? void 0 : _a.coordinates,
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
//Accept Order
app.post("/orders/:orderId/accept", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.body;
        const order = yield Order_1.default.findOne({ $or: [{ user: "orderId" }] });
        res.status(201).send(order);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
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
