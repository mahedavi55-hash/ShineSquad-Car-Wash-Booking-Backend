import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { env } from '../../../config/env';

interface LoginInput {
  email: string;
  password: string;
}

export class LoginUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LoginInput): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(input.email.toLowerCase());
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password.');
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });

    return { token };
  }
}
