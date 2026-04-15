import { BookingStatus } from '../enums/BookingStatus';

export interface Booking {
  id?: string;
  userId?: string | null;
  guestName?: string | null;
  guestEmail?: string | null;
  guestPhone?: string | null;
  serviceId: string;
  slotId: string;
  vehicleType: string;
  vehicleModel: string;
  vehiclePlate: string;
  notes?: string;
  status: BookingStatus;
  adminComment?: string;
}
