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
  const phoneExists = await Patient.findOne({ phone: input.phone });
  if (phoneExists) throw new Error('Patient with this phone number already exists.');
  const latestPatient = await Patient.findOne().sort({ createdAt: -1 }).select('opNumber');
  let nextNumber = 1;
  if (latestPatient?.opNumber && !isNaN(parseInt(latestPatient.opNumber))) {
    nextNumber = parseInt(latestPatient.opNumber) + 1;
  }
  const newOpNumber = String(nextNumber).padStart(4, '0');
  const opNumberExists = await Patient.findOne({ opNumber: newOpNumber });
  if (opNumberExists) throw new Error('OP number already exists. Try again.');
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
    prescriptionAdded: 'pending',
    opNumber: newOpNumber,
  });

  return await patient.save();
};
export const updatePatient = async (id: string, input: Partial<IPatient>): Promise<IPatient | null> => {
  return await Patient.findByIdAndUpdate(id, input, { new: true });
};

export const getActiveDoctors = async () => {
  return await Doctor.find({ status: true }).select('name _id department consultationFees');
};

export const searchPatientsService = async (query: string) => {
  if (!query) return [];

  return await Patient.find({
    $or: [
      { name: { $regex: query, $options: 'i' } },
      { phone: { $regex: query, $options: 'i' } },
      { opNumber: { $regex: query, $options: 'i' } },
    ],
  }).select('name phone opNumber age sex date department doctor place homeName prescriptionAdded')
  .populate('doctor', 'name');
};

export const getAllPatients = async () => {
  return await Patient.find({})
    .populate('doctor', 'name')
    .select('opNumber name phone place doctor date prescriptionAdded')
    .sort({ date: -1 }); 
};

export const getPatientById = async (id: string) => {
  const patient = await Patient.findById(id)
    .populate('doctor', 'name') // include doctor's name
    .select(
      'name age sex date renewalDate phone homeName place department consultationFees doctor opNumber prescriptionAdded'
    );

  if (!patient) {
    throw new Error('Patient not found');
  }

  return patient;
};

export const updatePatientDetails = async (
  id: string,
  updates: Partial<IPatient>
): Promise<IPatient | null> => {
  if ('opNumber' in updates) delete updates.opNumber;
  return await Patient.findByIdAndUpdate(id, updates, { new: true }).populate('doctor', 'name');
};

export const getMedicalHistoryByOpNumber = async (opNumber: string) => {
  return await Patient.find({ opNumber })
    .select('doctor department consultationFees date renewalDate prescriptionAdded')
    .populate('doctor', 'name');
};

export const addExPatientService = async (existingPatientId: string, doctorId: string): Promise<IPatient> => {
  const existingPatient = await Patient.findById(existingPatientId);
  if (!existingPatient) {
    throw new Error('Existing patient not found');
  }

  const doctor = await Doctor.findOne({ _id: doctorId, status: true });
  if (!doctor) {
    throw new Error('Doctor not found or is inactive');
  }

  const latestPatient = await Patient.findOne().sort({ createdAt: -1 }).select('opNumber');
  let nextNumber = 1;
  if (latestPatient?.opNumber && !isNaN(parseInt(latestPatient.opNumber))) {
    nextNumber = parseInt(latestPatient.opNumber) + 1;
  }
  const newOpNumber = String(nextNumber).padStart(4, '0');

  const newPatient = new Patient({
    name: existingPatient.name,
    sex: existingPatient.sex,
    age: existingPatient.age,
    homeName: existingPatient.homeName,
    place: existingPatient.place,
    phone: existingPatient.phone,
    doctor: doctor._id,
    department: doctor.department,
    consultationFees: doctor.consultationFees,
    prescriptionAdded: 'pending',
    opNumber: newOpNumber,
  });

  return await newPatient.save();
};


