import express from 'express';
import { fetchPendingPrescriptions,fetchAllPatients } from '../controllers/scannerController';
import { searchPatients } from '@controllers/patientController';

const scannerRoutes = express.Router();

scannerRoutes.get('/pending-patients', fetchPendingPrescriptions);
scannerRoutes.get('/all-patients', fetchAllPatients);
scannerRoutes.get('/search',searchPatients)

export default scannerRoutes;