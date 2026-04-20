import { Booking } from '../entities/Booking';
import { BookingStatus } from '../enums/BookingStatus';

export interface IBookingRepository {
  create(booking: Booking): Promise<Booking>;
  findById(id: string): Promise<Booking | null>;
  findByUserId(userId: string): Promise<Booking[]>;
  findAll(): Promise<Booking[]>;
  update(id: string, updates: Partial<Booking>): Promise<Booking | null>;
  updateStatus(
    id: string,
    status: BookingStatus,
    adminComment?: string
  ): Promise<Booking | null>;
}