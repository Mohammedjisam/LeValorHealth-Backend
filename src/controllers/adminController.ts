import { Request, Response } from 'express';
import { getAllReceptionists } from '../services/adminService';


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
