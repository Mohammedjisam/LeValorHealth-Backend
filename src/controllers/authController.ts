import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    await registerUser(req.body);
    res.status(201).json({ message: 'User registered' });
  } catch (err: unknown) {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(400).json({ message: 'Unknown error occurred' });
  }
}
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  }catch (err: unknown) {
  if (err instanceof Error) {
    res.status(400).json({ message: err.message });
  } else {
    res.status(400).json({ message: 'Unknown error occurred' });
  }
}
};
