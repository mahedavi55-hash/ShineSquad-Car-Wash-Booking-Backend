import { Role } from '../enums/Role';

export interface User {
  id?: string;
  fullName: string;
  email: string;
  passwordHash: string;
  phone: string;
  role: Role;
}
