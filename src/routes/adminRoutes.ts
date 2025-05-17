// src/routes/adminRoutes.ts
import express from 'express';
import { getReceptionists, updateReceptionistStatus,getScanner, updateScannerStatus  } from '../controllers/adminController';
import { addDoctor, fetchDoctors,editDoctor } from '../controllers/doctorController';

const adminRoutes = express.Router();

adminRoutes.get('/receptionists', getReceptionists);
adminRoutes.patch('/receptionists/:id/toggle', updateReceptionistStatus); 
adminRoutes.get('/scanner', getScanner);
adminRoutes.patch('/scanner/:id/toggle', updateScannerStatus);
adminRoutes.get('/doctors', fetchDoctors);        
adminRoutes.post('/doctors/add', addDoctor); 
adminRoutes.put('/doctors/:id', editDoctor);


export default adminRoutes;



