import { IBookingRepository } from '../../../domain/repositories/IBookingRepository';
import { BookingStatus } from '../../../domain/enums/BookingStatus';

export class GetBookingAnalytics {
  constructor(private readonly bookingRepository: IBookingRepository) {}

  async execute(): Promise<Record<string, number>> {
    const bookings = await this.bookingRepository.findAll();
    return {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === BookingStatus.PENDING).length,
      approvedBookings: bookings.filter((b) => b.status === BookingStatus.APPROVED).length,
      declinedBookings: bookings.filter((b) => b.status === BookingStatus.DECLINED).length,
      completedBookings: bookings.filter((b) => b.status === BookingStatus.COMPLETED).length,
      cancelledBookings: bookings.filter((b) => b.status === BookingStatus.CANCELLED).length,
    };
  }
}
