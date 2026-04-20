import { IBookingRepository } from '../../../domain/repositories/IBookingRepository';
import { ISlotRepository } from '../../../domain/repositories/ISlotRepository';

export class RescheduleBooking {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly slotRepository: ISlotRepository,
  ) {}

  async execute(bookingId: string, newSlotId: string) {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found.');
    }

    const slot = await this.slotRepository.findById(newSlotId);
    if (!slot) {
      throw new Error('New slot not found.');
    }

    const updatedBooking = await this.bookingRepository.update(bookingId, {
      slotId: newSlotId,
      status: booking.status,
    });

    if (!updatedBooking) {
      throw new Error('Unable to reschedule booking.');
    }

    return updatedBooking;
  }
}