import { IBookingRepository } from '../../../domain/repositories/IBookingRepository';
import { Booking } from '../../../domain/entities/Booking';

export class GetMyBookings {
  constructor(private readonly bookingRepository: IBookingRepository) {}

  async execute(userId: string): Promise<Booking[]> {
    return this.bookingRepository.findByUserId(userId);
  }
}
