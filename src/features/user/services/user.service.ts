import { User } from 'generated/prisma';
import prisma from '~/prisma';

class UserService {
  public async createUser(reqestBody: any): Promise<User> {
    const { name, email, password, role } = reqestBody;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        status: true,
        role
      }
    });

    return user;
  }

  public async getAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}

export const userService: UserService = new UserService();
