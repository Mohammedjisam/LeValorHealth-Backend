import { Request, Response } from 'express';
import { getPendingPrescriptions  } from '../services/scannerService';
import { getAllPatients } from '@services/patientService';

export const fetchPendingPrescriptions = async (req: Request, res: Response) => {
  try {
    const patients = await getPendingPrescriptions();

    res.status(200).json({
      status: true,
      data: patients,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      message: error.message || 'Failed to fetch pending prescriptions',
    });
  }
};

export const fetchAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await getAllPatients();
    res.status(200).json({ status: true, data: patients });
  } catch (error: any) {
    res.status(500).json({ status: false, message: error.message });
  }
};