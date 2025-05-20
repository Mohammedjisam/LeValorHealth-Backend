import { Request, Response  } from 'express';
import { createPatient, updatePatient, getActiveDoctors ,searchPatientsService,getPatientById,updatePatientDetails,getMedicalHistoryByOpNumber, addExPatientService } from '../services/patientService';

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

export const searchPatients = async (req: Request, res: Response) => {
  try {
    const query = req.query.query as string;
    const patients = await searchPatientsService(query);
    res.status(200).json({ status: true, data: patients });
  } catch (error: any) {
    res.status(500).json({ status: false, message: 'Error searching patients', error: error.message });
  }
};

export const getPatientDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const patient = await getPatientById(id);

    res.status(200).json({ status: true, data: patient });
  } catch (error: any) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export const updatePatientDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updated = await updatePatientDetails(id, req.body);
    if (!updated) {
      res.status(404).json({ status: false, message: 'Patient not found' });
      return;
    }

    res.status(200).json({ status: true, message: 'Patient updated successfully', data: updated });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};

export const getMedicalHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { opNumber } = req.params;

    const records = await getMedicalHistoryByOpNumber(opNumber);

    if (!records || records.length === 0) {
      res.status(404).json({ status: false, message: 'No medical history found for this OP number' });
      return;
    }

    res.status(200).json({ status: true, data: records });
  } catch (error: any) {
    res.status(500).json({ status: false, message: 'Error fetching medical history', error: error.message });
  }
};

export const addExPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { existingPatientId, doctorId } = req.body;

    if (!existingPatientId || !doctorId) {
      res.status(400).json({
        status: false,
        message: 'existingPatientId and doctorId are required.',
      });
      return;
    }

    const patient = await addExPatientService(existingPatientId, doctorId);

    res.status(201).json({
      status: true,
      message: 'New prescription created for existing patient',
      data: patient,
    });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};