import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    message: { type: String, required: true },
    orderId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
  
export default mongoose.model("Notification", notificationSchema);