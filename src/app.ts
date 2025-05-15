// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';
import cors from 'cors'; // ✅ import cors
import adminRoutes from '@routes/adminRoutes';


dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

export default app;
