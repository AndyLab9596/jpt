import jwt from 'jsonwebtoken';
import { BadRequestException } from '../cores/error.core';
import { User } from 'generated/prisma';
import { NextFunction, Request, Response } from 'express';

export function verifyUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new BadRequestException('please provide token');
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);
  const { name, email, role } = decoded as UserPayload;
  req.currentUser = { name, email, role };
  next();
}
