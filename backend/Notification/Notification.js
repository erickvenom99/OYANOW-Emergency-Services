"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    providerId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Provider', required: true },
    message: { type: String, required: true },
    orderId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.default = mongoose_1.default.model("Notification", notificationSchema);
