import express from 'express';
import { fetchPendingPrescriptions,fetchAllPatients } from '../controllers/scannerController';

const scannerRoutes = express.Router();

scannerRoutes.get('/pending-patients', fetchPendingPrescriptions);
scannerRoutes.get('/all-patients', fetchAllPatients);

export default scannerRoutes;