import { Slot } from '../entities/Slot';
import { Service } from '../entities/Service';

export class BookingRules {
  static ensureServiceIsBookable(service: Service | null): void {
    if (!service || !service.isActive) {
      throw new Error('Selected service is not available for booking.');
    }
  }

  static ensureSlotIsBookable(slot: Slot | null): void {
    if (!slot || !slot.isActive) {
      throw new Error('Selected slot is not available.');
    }

    if (slot.bookedCount >= slot.maxBookings) {
      throw new Error('Selected slot is fully booked.');
    }
  }

  static ensureVehicleDetails(vehicleType: string, vehicleModel: string, vehiclePlate: string): void {
    if (!vehicleType || !vehicleModel || !vehiclePlate) {
      throw new Error('Vehicle information is required.');
    }
  }
}
