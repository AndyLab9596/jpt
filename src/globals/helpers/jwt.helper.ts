import { User } from 'generated/prisma';
import jwt from 'jsonwebtoken';

export async function generateAccessToken(user: User) {
  const accessToken = await jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET!
    // {
    //   expiresIn: '1d'
    // }
  );

  return accessToken;
}
