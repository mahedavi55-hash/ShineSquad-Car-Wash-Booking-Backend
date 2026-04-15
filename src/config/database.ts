import mongoose from 'mongoose';
import { env } from './env';
import { appLogger } from '../infrastructure/logging/Logger';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.mongoUri);
    appLogger.info('MongoDB connected successfully.');
  } catch (error) {
    appLogger.error('MongoDB connection failed.', { error });
    throw error;
  }
};
