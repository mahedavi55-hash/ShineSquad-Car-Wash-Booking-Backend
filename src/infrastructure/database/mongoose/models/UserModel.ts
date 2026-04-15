import { Schema, model } from 'mongoose';
import { Role } from '../../../../domain/enums/Role';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.CUSTOMER },
  },
  { timestamps: true },
);

export const UserModel = model('User', userSchema);
