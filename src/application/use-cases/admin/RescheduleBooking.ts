import { Booking } from '../../../domain/entities/Booking';
import { BookingStatus } from '../../../domain/enums/BookingStatus';
import { IBookingRepository } from '../../../domain/repositories/IBookingRepository';
import { ISlotRepository } from '../../../domain/repositories/ISlotRepository';
import { BookingRules } from '../../../domain/services/BookingRules';

export class RescheduleBooking {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly slotRepository: ISlotRepository,
  ) {}

  async execute(bookingId: string, newSlotId: string): Promise<Booking> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found.');
    }

    const newSlot = await this.slotRepository.findById(newSlotId);
    BookingRules.ensureSlotIsBookable(newSlot);

    if (booking.slotId === newSlotId) {
      throw new Error('Booking is already assigned to this slot.');
    }

    await this.slotRepository.incrementBookingCount(newSlotId);

    const updatedBooking = await this.bookingRepository.update(bookingId, {
      slotId: newSlotId,
      status: BookingStatus.PENDING,
    });

    if (!updatedBooking) {
      throw new Error('Failed to reschedule booking.');
    }

    return updatedBooking;
  }
}