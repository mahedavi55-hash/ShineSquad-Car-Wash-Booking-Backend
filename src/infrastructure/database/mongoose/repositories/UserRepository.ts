import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';
import { UserModel } from '../models/UserModel';

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const saved = await UserModel.create(user);
    return { id: saved.id, fullName: saved.fullName, email: saved.email, passwordHash: saved.passwordHash, phone: saved.phone, role: saved.role };
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await UserModel.findOne({ email });
    return found ? { id: found.id, fullName: found.fullName, email: found.email, passwordHash: found.passwordHash, phone: found.phone, role: found.role } : null;
  }

  async findById(id: string): Promise<User | null> {
    const found = await UserModel.findById(id);
    return found ? { id: found.id, fullName: found.fullName, email: found.email, passwordHash: found.passwordHash, phone: found.phone, role: found.role } : null;
  }
}
