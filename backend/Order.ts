// Order.ts
import mongoose, { Document, Schema } from "mongoose";

interface IOrder extends Document {
  user: mongoose.Schema.Types.ObjectId;
  provider: mongoose.Schema.Types.ObjectId;
  orderId: string;
  status: "pending" | "accepted" | "in-progress" | "completed" | "canceled";
  coordinates: {
    type: "Point";
    coordinates: [number, number];
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  orderId: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "in-progress", "completed", "canceled"],
    default: "pending",
  },
  coordinates: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
