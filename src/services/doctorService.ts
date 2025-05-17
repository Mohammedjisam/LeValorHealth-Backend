// src/services/doctorService.ts
import Doctor from '../models/Doctor';
import { IDoctor } from '../models/Doctor';

interface CreateDoctorInput {
  name: string;
  qualification: string;
  specialization: string;
  department: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  phone: string;
  email: string;
  status?: boolean;
}

interface UpdateDoctorInput extends Partial<CreateDoctorInput> {}

export const createDoctor = async (input: CreateDoctorInput): Promise<IDoctor> => {
  const existing = await Doctor.findOne({ email: input.email });
  if (existing) throw new Error('Doctor with this email already exists');

  const doctor = new Doctor(input);
  return await doctor.save();
};

export const getAllDoctors = async (): Promise<IDoctor[]> => {
  return await Doctor.find().sort({ createdAt: -1 });
};

export const updateDoctorById = async (id: string, input: UpdateDoctorInput): Promise<IDoctor> => {
  const doctor = await Doctor.findById(id);
  if (!doctor) throw new Error('Doctor not found');
  if (input.email && input.email !== doctor.email) {
    const existingEmail = await Doctor.findOne({ email: input.email });
    if (existingEmail) throw new Error('Email already in use by another doctor');
  }

  Object.assign(doctor, input);
  return await doctor.save();
};
