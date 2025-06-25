import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestException, NotFoundException } from '~/globals/cores/error.core';
import { generateAccessToken } from '~/globals/helpers/jwt.helper';
import { User } from 'generated/prisma';

class AuthService {
  public async signUp(requestBody: any) {
    const { email, name, password } = requestBody;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const accessToken = await generateAccessToken(user);

    return accessToken;
  }

  public async signIn(requestBody: any) {
    const { email, password } = requestBody;

    const userByEamil = await this.findUserByEmail(email);
    if (!userByEamil) {
      throw new NotFoundException(`Invalid credential`);
    }

    const isMatchPassword = await bcrypt.compare(password, userByEamil.password);
    if (!isMatchPassword) throw new BadRequestException('Invalid credential');

    const accessToken = await generateAccessToken(userByEamil);

    return accessToken;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    const userByEamil = await prisma.user.findFirst({ where: { email } });
    return userByEamil;
  }
}

export const authService: AuthService = new AuthService();
