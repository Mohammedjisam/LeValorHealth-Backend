import { Request, Response } from 'express';
import { createPatient, updatePatient, getActiveDoctors } from '../services/patientService';

export const addPatient = async (req: Request, res: Response) => {
  try {
    const patient = await createPatient(req.body);
    res.status(201).json({ status: true, message: 'Patient registered', data: patient });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const editPatient = async (req: Request, res: Response) => {
  try {
    const updated = await updatePatient(req.params.id, req.body);
    res.status(200).json({ status: true, message: 'Patient updated', data: updated });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const fetchActiveDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await getActiveDoctors();
    res.status(200).json({ status: true, data: doctors });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch doctors' });
  }
};
