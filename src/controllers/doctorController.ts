import { Request, Response } from 'express';
import { createDoctor, getAllDoctors, updateDoctorById } from '../services/doctorService';

export const addDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await createDoctor(req.body);
    res.status(201).json({
      status: true,
      message: 'Doctor added successfully',
      data: doctor,
    });
  } catch (error: any) {
    console.error('Error adding doctor:', error.message);
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to add doctor',
    });
  }
};

export const fetchDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await getAllDoctors();
    res.status(200).json({
      status: true,
      message: 'Doctors fetched successfully',
      data: doctors,
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch doctors',
    });
  }
};

export const editDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedDoctor = await updateDoctorById(id, req.body);
    res.status(200).json({
      status: true,
      message: 'Doctor updated successfully',
      data: updatedDoctor,
    });
  } catch (error: any) {
    console.error('Error updating doctor:', error.message);
    res.status(400).json({
      status: false,
      message: error.message || 'Failed to update doctor',
    });
  }
};
