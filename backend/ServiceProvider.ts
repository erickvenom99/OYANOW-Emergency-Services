import mongoose from "mongoose";

const ServiceProvider = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  location: {
    country: {type: String, required: true},
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    coordinates: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true},
    },
  },
  services: {
    type: [String],
    enum: ["Mechanic", "Electrician", "Plumber"], // Restrict to these three services
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

export default mongoose.model("Provider", ServiceProvider);
