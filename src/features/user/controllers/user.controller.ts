import { NextFunction, Request, Response } from 'express';
import prisma from '~/prisma';
import { userService } from '../services/user.service';
import { userCreateSchema } from '../schemas/user.schema';

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await userService.getAll();

    res.status(200).json({
      message: 'Get all users successfully',
      data: users
    });
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    const user = await userService.createUser(req.body);

    return res.status(201).json({
      message: 'Create user successfully',
      data: user
    });
  }
}

export const userController: UserController = new UserController();
