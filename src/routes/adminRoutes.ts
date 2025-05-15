import express from 'express';
import { getReceptionists } from '@controllers/adminController';

const adminRoutes = express.Router();

adminRoutes.get('/receptionists', getReceptionists);

export default adminRoutes;
