import mongoose, { Schema, Document } from 'mongoose';

export interface IPatient extends Document {
  name: string;
  sex: 'male' | 'female' | 'other';
  age: number;
  homeName: string;
  place: string;
  phone: string;
  date: Date;
  renewalDate: Date;
  doctor: mongoose.Types.ObjectId;
  department: string;
  consultationFees: number;
  opNumber: string;
  prescriptionAdded: 'added' | 'notAdded';
}

const patientSchema = new Schema<IPatient>(
  {
    name: { type: String, required: true },
    sex: { type: String, enum: ['male', 'female', 'other'], required: true },
    age: { type: Number, required: true },
    homeName: { type: String, required: true },
    place: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
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
    prescriptionAdded: {
      type: String,
      enum: ['added', 'notAdded'],
      default: 'notAdded',
    },
    opNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

patientSchema.pre<IPatient>('save', async function (next) {
  if (this.opNumber) return next();

  const latestPatient = await mongoose
    .model<IPatient>('Patient')
    .findOne({})
    .sort({ createdAt: -1 })
    .select('opNumber');

  let nextNumber = 1;
  if (latestPatient && latestPatient.opNumber) {
    const last = parseInt(latestPatient.opNumber);
    if (!isNaN(last)) nextNumber = last + 1;
  }

  this.opNumber = String(nextNumber).padStart(4, '0');
  next();
});

patientSchema.index({ name: 1 });

export default mongoose.model<IPatient>('Patient', patientSchema);
