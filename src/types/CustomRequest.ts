// src/types/CustomRequest.ts
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  } & JwtPayload;
}
