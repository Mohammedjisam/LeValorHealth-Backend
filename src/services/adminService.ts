// src/services/adminService.ts
import User from '../models/User';

export const getAllReceptionists = async () => {
  return await User.find({ role: 'receptionist' }).select('name email phone isAdminVerified');
};

export const getAllScanners = async () => {
  return await User.find({ role: 'PrescriptionDataEntryOperator' }).select('name email phone isAdminVerified');
};

export const toggleAdminVerification = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user || (user.role !== 'receptionist' && user.role !== 'PrescriptionDataEntryOperator')) {
    throw new Error('User not found or role not eligible');
  }
  user.isAdminVerified = !user.isAdminVerified;
  await user.save();
  return user;
};
