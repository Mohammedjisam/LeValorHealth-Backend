import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';


export interface IDoctor extends Document {
  name: string;
  qualification: string;
  specialization: string;
  department: string;
  registerNumber: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  phone: string;
  email: string;
  consultationFees: number;
  status: boolean;
}


const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    qualification: { type: String, required: true },
    specialization: { type: String, required: true },
    department: { type: String, required: true },
    registerNumber: {
      type: String,
      unique: true,
      default: () => `DRID-${uuidv4().split('-')[0].toUpperCase()}`,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    consultationFees: { type: Number, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
