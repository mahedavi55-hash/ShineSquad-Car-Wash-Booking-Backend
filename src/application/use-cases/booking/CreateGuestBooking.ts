import { Booking } from '../../../domain/entities/Booking';
import { BookingStatus } from '../../../domain/enums/BookingStatus';
import { IBookingRepository } from '../../../domain/repositories/IBookingRepository';
import { IServiceRepository } from '../../../domain/repositories/IServiceRepository';
import { ISlotRepository } from '../../../domain/repositories/ISlotRepository';
import { BookingRules } from '../../../domain/services/BookingRules';

interface GuestBookingInput {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  serviceId: string;
  slotId: string;
  vehicleType: string;
  vehicleModel: string;
  vehiclePlate: string;
  notes?: string;
}

export class CreateGuestBooking {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly serviceRepository: IServiceRepository,
    private readonly slotRepository: ISlotRepository,
  ) {}

  async execute(input: GuestBookingInput): Promise<Booking> {
    const service = await this.serviceRepository.findById(input.serviceId);
    const slot = await this.slotRepository.findById(input.slotId);

    BookingRules.ensureServiceIsBookable(service);
    BookingRules.ensureSlotIsBookable(slot);
    BookingRules.ensureVehicleDetails(input.vehicleType, input.vehicleModel, input.vehiclePlate);

    await this.slotRepository.incrementBookingCount(input.slotId);

    return this.bookingRepository.create({
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone,
      serviceId: input.serviceId,
      slotId: input.slotId,
      vehicleType: input.vehicleType,
      vehicleModel: input.vehicleModel,
      vehiclePlate: input.vehiclePlate,
      notes: input.notes,
      status: BookingStatus.PENDING,
    });
  }
}
