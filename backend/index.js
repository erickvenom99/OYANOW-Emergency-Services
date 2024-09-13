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
const ServiceProvider_1 = __importDefault(require("./ServiceProvider"));
const User_1 = __importDefault(require("./User"));
const Order_1 = __importDefault(require("./Order"));
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
    .connect("mongodb://localhost:27017/oyanow")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
// Service Provider Sign-Up
app.post("/service-providers/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, phoneNumber, services, coordinates } = req.body; // Adjusted to accept coordinates
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
        // Create provider document with coordinates
        const provider = new ServiceProvider_1.default({
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
        yield provider.save();
        const locationCoordinates = provider.location ? provider.location.coordinates : null;
        res.status(201).send({
            userId: provider._id,
            username: provider.username,
            services: provider.services,
            coordinates: locationCoordinates,
        });
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Service Provider Login
app.post("/service-providers/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        // If password is correct
        res.status(200).send({
            userId: provider._id,
            username: provider.username,
            name: provider.name,
            email: provider.email,
            coordinates: (_a = provider.location) === null || _a === void 0 ? void 0 : _a.coordinates,
        });
    }
    catch (error) {
        res.status(500).send(error);
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
app.post("/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, providerId, orderId, coordinates } = req.body;
        const order = new Order_1.default({
            user: userId,
            provider: providerId,
            orderId,
            coordinates,
        });
        yield order.save();
        res.status(201).send(order);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
// Accept Order
app.post("/orders/:orderId/accept", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield Order_1.default.findOneAndUpdate({ orderId }, { status: "accepted" }, { new: true });
        if (!order)
            return res.status(404).send("Order not found");
        res.status(200).send(order);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Update Order Location
app.put("/orders/:orderId/location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { coordinates } = req.body;
        const order = yield Order_1.default.findOneAndUpdate({ orderId }, { coordinates, status: "in-progress" }, { new: true });
        if (!order)
            return res.status(404).send("Order not found");
        // Emit location update to all connected clients
        socketIO.emit("locationUpdate", {
            orderId,
            coordinates,
        });
        res.status(200).send(order); // Respond with the updated order
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
