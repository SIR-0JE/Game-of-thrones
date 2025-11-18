import mongoose, { Schema, Model } from "mongoose";
import { HouseType } from "@/config/houses";

export interface IStudent {
  name: string;
  level: string;
  department: string;
  matricNumber?: string;
  house: HouseType;
  createdAt: Date;
}

const StudentSchema = new Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  matricNumber: {
    type: String,
    required: false,
    default: null,
  },
  house: {
    type: String,
    enum: ["stark", "baratheon", "greyjoy", "lannister", "targaryen"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Compound index for duplicate prevention
StudentSchema.index({ name: 1, level: 1, department: 1 }, { unique: true });

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;

