import { Schema, model } from 'mongoose';
import { BookingStatus } from '../../../../domain/enums/BookingStatus';

const bookingSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    guestName: { type: String, default: null },
    guestEmail: { type: String, default: null },
    guestPhone: { type: String, default: null },
    serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
    vehicleType: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehiclePlate: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: Object.values(BookingStatus), default: BookingStatus.PENDING },
    adminComment: { type: String },
  },
  { timestamps: true },
);

export const BookingModel = model('Booking', bookingSchema);
