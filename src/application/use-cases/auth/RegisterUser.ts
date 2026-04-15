import bcrypt from 'bcrypt';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { Role } from '../../../domain/enums/Role';
import { User } from '../../../domain/entities/User';

interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export class RegisterUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: RegisterInput): Promise<Omit<User, 'passwordHash'>> {
  const existingUser = await this.userRepository.findByEmail(input.email);
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const passwordHash = await bcrypt.hash(input.password, 10);

  const createdUser = await this.userRepository.create({
    fullName: input.fullName,
    email: input.email.toLowerCase(),
    passwordHash,
    phone: input.phone,
    role: Role.CUSTOMER,
  });

  const { passwordHash: _passwordHash, ...safeUser } = createdUser;
  return safeUser;
}}
