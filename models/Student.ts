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
    // ADD THIS VALIDATION
    validate: {
      validator: function(matric: string) {
        // If matric number is provided, validate the format
        if (matric && matric.trim() !== "") {
          const matricRegex = /^BU\d{2}[A-Z]{3,4}\d{4}$/;
          return matricRegex.test(matric);
        }
        // If no matric number, validation passes (for level 100)
        return true;
      },
      message: 'Invalid matric number format. Example: BU22CSC1068'
    }
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

// ADD THIS INDEX for matric number uniqueness (only when provided)
StudentSchema.index({ matricNumber: 1 }, { 
  unique: true, 
  sparse: true, // This allows multiple null values
  partialFilterExpression: { matricNumber: { $type: "string" } } 
});

const Student: Model<IStudent> =
  mongoose.models.Student || mongoose.model<IStudent>("Student", StudentSchema);

export default Student;