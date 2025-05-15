import User from '../models/User';

export const getAllReceptionists = async () => {
  return await User.find({ role: 'receptionist' }).select(
    'name email phone isAdminVerified'
  );
};
