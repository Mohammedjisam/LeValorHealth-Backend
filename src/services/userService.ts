import User from '../models/User'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RegisterInput, LoginInput } from '../interfaces/UserInput';

export const registerUser = async ({ name, email, phone, password, role }: RegisterInput) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already exists');

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, phone, password: hashed, role });
  return await user.save();
};

export const loginUser = async ({ email, password, role }: LoginInput & { role: string }) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // 🔒 Check role match
  if (user.role !== role) {
    throw new Error('You are not authorized to log in as this role');
  }

  // 🔒 Check admin verification for non-admins
  if (role !== 'admin' && !user.isAdminVerified) {
    throw new Error('Your account is pending admin verification');
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });

  return {
    token,
    user: { name: user.name, email: user.email, role: user.role },
  };
};
