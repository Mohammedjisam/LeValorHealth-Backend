import express from 'express';
import { addPatient, editPatient, fetchActiveDoctors } from '../controllers/patientController';

const receptionistRoutes = express.Router();

receptionistRoutes.post('/patients/add', addPatient);
receptionistRoutes.put('/patients/:id', editPatient);
receptionistRoutes.get('/doctors/active', fetchActiveDoctors); 

export default receptionistRoutes;
