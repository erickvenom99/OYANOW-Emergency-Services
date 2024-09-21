import mongoose, { Document, Schema } from "mongoose";

interface ILocation {
  type: "Point";
  coordinates: [number, number]; // [longitude, latitude]
}

export interface IServiceProvider extends Document {
  _id: string;
  username: string;
  name: string;
  email: string;
  passwordHash: string;
  location: ILocation;
  services: string[];
  status: "available" | "busy";
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceProviderSchema = new mongoose.Schema<IServiceProvider>({
  _id: {type: String, required: true},
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

export default mongoose.model<IServiceProvider>("Provider", ServiceProviderSchema);