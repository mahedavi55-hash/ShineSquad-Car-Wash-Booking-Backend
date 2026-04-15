import dotenv from 'dotenv';

dotenv.config();

export const env = {
  appName: process.env.APP_NAME || 'ShineSquad Car Wash Booking Backend',
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shinesquad',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};