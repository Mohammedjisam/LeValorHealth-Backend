// src/routes/adminRoutes.ts
import express from 'express';
import { getReceptionists, updateReceptionistStatus,getScanner, updateScannerStatus  } from '../controllers/adminController';

const adminRoutes = express.Router();

adminRoutes.get('/receptionists', getReceptionists);
adminRoutes.patch('/receptionists/:id/toggle', updateReceptionistStatus); 
adminRoutes.get('/scanner', getScanner);
adminRoutes.patch('/scanner/:id/toggle', updateScannerStatus);

export default adminRoutes;



