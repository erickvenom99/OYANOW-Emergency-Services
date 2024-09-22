"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ServiceProviderSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    location: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true }
    },
    services: {
        type: [String],
        enum: ["Mechanic", "Electrician", "Plumber"],
        required: true,
    },
    status: {
        type: String,
        enum: ["available", "busy"],
        default: "available",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Create a geospatial index on the location field
ServiceProviderSchema.index({ location: '2dsphere' });
exports.default = mongoose_1.default.model("Provider", ServiceProviderSchema);
