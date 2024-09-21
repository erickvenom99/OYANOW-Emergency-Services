import mongoose, { Document, Schema } from "mongoose";

interface ILocation {
  type: "Point";
  coordinates: number[];
}

export interface IUser extends Document {
  username: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  location: ILocation;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true },
  },
});

// Index for geospatial queries
userSchema.index({ location: '2dsphere' });

export default mongoose.model<IUser>("User", userSchema);