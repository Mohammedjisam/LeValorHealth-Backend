import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPatient extends Document {
  name: string;
  sex: 'male' | 'female' | 'other';
  age: number;
  homeName: string;
  place:string;
  phone: string;
  date: Date;
  renewalDate: Date;
  doctor: mongoose.Types.ObjectId;
  department: string;
  consultationFees: number;
  opNumber: string;
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    sex: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, required: true },
    homeName: { type: String, required: true },
    place: { type: String, required: true },
    phone: { type: String, required: true },
    date: {
      type: Date,
      default: () => new Date(),
    },
    renewalDate: {
      type: Date,
      default: () => {
        const now = new Date();
        now.setDate(now.getDate() + 7);
        return now;
      },
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    department: { type: String, required: true },
    consultationFees: { type: Number, required: true },
    opNumber: {
      type: String,
      unique: true,
      default: () => `OP-${uuidv4().split('-')[0].toUpperCase()}`,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPatient>('Patient', patientSchema);
