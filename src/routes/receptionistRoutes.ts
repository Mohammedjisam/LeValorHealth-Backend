import express from 'express'
import {
  addPatient,
  editPatient,
  fetchActiveDoctors,
  searchPatients,getPatientDetails,updatePatientDetailsController,getMedicalHistory,addExPatient
} from '../controllers/patientController'

const receptionistRoutes = express.Router()

receptionistRoutes.post('/patients/add', addPatient)
receptionistRoutes.put('/patients/:id', editPatient)
receptionistRoutes.get('/doctors/active', fetchActiveDoctors)
receptionistRoutes.get('/patients/search', searchPatients)
receptionistRoutes.get('/patients/:id', getPatientDetails);
receptionistRoutes.patch('/patients/:id', updatePatientDetailsController);
receptionistRoutes.get('/patients/history/:opNumber', getMedicalHistory);
receptionistRoutes.post('/patients/existing/add', addExPatient);



export default receptionistRoutes
