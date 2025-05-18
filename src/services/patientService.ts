import Patient, { IPatient } from '../models/Patient';
import Doctor from '../models/Doctor';
import mongoose from 'mongoose';

interface PatientInput {
  name: string;
  sex: 'male' | 'female' | 'other';
  age: number;
  homeName: string;
  place:string;
  phone: string;
  doctorId: string;
}

export const createPatient = async (input: PatientInput): Promise<IPatient> => {
  const doctor = await Doctor.findOne({ _id: input.doctorId, status: true });
  if (!doctor) throw new Error('Doctor not found or is currently on leave');

  const patient = new Patient({
    name: input.name,
    sex: input.sex,
    age: input.age,
    homeName: input.homeName,
    place: input.place,
    phone: input.phone,
    doctor: doctor._id,
    department: doctor.department,
    consultationFees: doctor.consultationFees,
    prescriptionAdded: 'notAdded',
  });

  return await patient.save();
};

export const updatePatient = async (id: string, input: Partial<IPatient>): Promise<IPatient | null> => {
  return await Patient.findByIdAndUpdate(id, input, { new: true });
};

export const getActiveDoctors = async () => {
  return await Doctor.find({ status: true }).select('name _id department consultationFees');
};
