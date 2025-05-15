import { Request, Response } from 'express';
import { getAllReceptionists,getAllScanners, toggleAdminVerification   } from '../services/adminService';


export const getReceptionists = async (req: Request, res: Response) => {
  try {
    const receptionists = await getAllReceptionists();
    res.status(200).json({
      status: true,
      message: 'Receptionists fetched successfully',
      data: receptionists,
    });
  } catch (error) {
    console.error('Error fetching receptionists:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch receptionists',
    });
  }
};

export const updateReceptionistStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await toggleAdminVerification(id);
    res.status(200).json({
      status: true,
      message: 'Receptionist status updated',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating receptionist status:', error);
    res.status(500).json({ status: false, message: 'Failed to update status' });
  }
};

export const getScanner = async (req: Request, res: Response) => {
  try {
    const scanners = await getAllScanners();
    res.status(200).json({
      status: true,
      message: 'Scanners fetched successfully',
      data: scanners,
    });
  } catch (error) {
    console.error('Error fetching scanners:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch scanners',
    });
  }
};

export const updateScannerStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await toggleAdminVerification(id);
    res.status(200).json({
      status: true,
      message: 'Scanner status updated',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating scanner status:', error);
    res.status(500).json({ status: false, message: 'Failed to update status' });
  }
};