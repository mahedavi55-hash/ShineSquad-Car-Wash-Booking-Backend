import { IBookingRepository } from '../../../domain/repositories/IBookingRepository';
import { Booking } from '../../../domain/entities/Booking';
import { BookingStatus } from '../../../domain/enums/BookingStatus';

export class ApproveBooking {
  constructor(private readonly bookingRepository: IBookingRepository) {}

  async execute(bookingId: string): Promise<Booking | null> {
    return this.bookingRepository.updateStatus(bookingId, BookingStatus.APPROVED);
  }
}
