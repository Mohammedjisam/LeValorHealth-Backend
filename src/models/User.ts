// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export type Role = 'receptionist' | 'PrescriptionDataEntryOperator' | 'admin';

interface IUser extends Document {
  name: string;
  email: string;
  phone: string; // ✅ Add this
  password: string;
  role: Role;
  isAdminVerified: boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }, // ✅ Add this
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['receptionist', 'PrescriptionDataEntryOperator', 'admin'],
    required: true,
  },
  isAdminVerified: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
