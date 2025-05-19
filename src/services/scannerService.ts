// src/services/scannerService.ts
import Patient from '../models/Patient';

export const getPendingPrescriptions = async () => {
  return await Patient.find({ prescriptionAdded: 'pending' })
    .populate('doctor', 'name')
    .select('opNumber name phone place doctor date prescriptionAdded')
    .sort({ date: -1 }); 
};

export const getAllPatients = async () => {
  return await Patient.find({})
    .populate('doctor', 'name')
    .select('opNumber name phone place doctor date prescriptionAdded')
    .sort({ date: -1 }); 
};