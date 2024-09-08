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
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = (0, socket_1.default)(server);
mongoose_1.default
    .connect("mongodb://localhost:27017/oyanow")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
app.post("/service-providers/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, password, phoneNumber, address, city, state, zipcode } = req.body;
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
        const provider = new ServiceProvider_1.default(Object.assign(Object.assign({}, req.body), { passwordHash, location: {
                address,
                city,
                state,
                zipcode
            } }));
        yield provider.save();
        res.status(201).send(provider);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
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
            id: provider._id,
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
app.post("/user/sign-up", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
        const user = new User_1.default(Object.assign(Object.assign({}, req.body), { passwordHash }));
        res.status(201).send(user);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
app.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            coordinates: (_a = user.location) === null || _a === void 0 ? void 0 : _a.coordinates,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
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
// Route to accept an order by the service provider
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
app.put("/orders/:orderId/location", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { coordinates } = req.body;
        const order = yield Order_1.default.findOneAndUpdate({ orderId }, { coordinates, status: "in-progress" }, { new: true });
        if (!order)
            return res.status(404).send("Order not found");
        io.emit("locationUpdate", {
            orderId,
            coordinates,
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
