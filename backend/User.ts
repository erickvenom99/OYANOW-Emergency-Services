import mongoose from "mongoose";

const User = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String },
    state: { type: String },
    zip: { type: String },
    coordinates: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
  },
});

export default mongoose.model("User", User);
