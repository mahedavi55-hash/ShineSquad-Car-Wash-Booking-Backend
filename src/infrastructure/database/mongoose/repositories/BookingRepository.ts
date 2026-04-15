import { IBookingRepository } from '../../../../domain/repositories/IBookingRepository';
import { Booking } from '../../../../domain/entities/Booking';
import { BookingStatus } from '../../../../domain/enums/BookingStatus';
import { BookingModel } from '../models/BookingModel';

export class BookingRepository implements IBookingRepository {
  async create(booking: Booking): Promise<Booking> {
    const saved = await BookingModel.create(booking);
    return this.map(saved);
  }

  async findById(id: string): Promise<Booking | null> {
    const found = await BookingModel.findById(id);
    return found ? this.map(found) : null;
  }

  async findByUserId(userId: string): Promise<Booking[]> {
    const bookings = await BookingModel.find({ userId });
    return bookings.map((item) => this.map(item));
  }

  async findAll(): Promise<Booking[]> {
    const bookings = await BookingModel.find();
    return bookings.map((item) => this.map(item));
  }

  async updateStatus(id: string, status: BookingStatus, adminComment?: string): Promise<Booking | null> {
    const updated = await BookingModel.findByIdAndUpdate(
      id,
      { status, adminComment },
      { new: true }
    );
    return updated ? this.map(updated) : null;
  }

  async update(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    const updated = await BookingModel.findByIdAndUpdate(id, updates, { new: true });
    return updated ? this.map(updated) : null;
  }

  private map(item: any): Booking {
    return {
      id: item.id,
      userId: item.userId?.toString() || null,
      guestName: item.guestName,
      guestEmail: item.guestEmail,
      guestPhone: item.guestPhone,
      serviceId: item.serviceId.toString(),
      slotId: item.slotId.toString(),
      vehicleType: item.vehicleType,
      vehicleModel: item.vehicleModel,
      vehiclePlate: item.vehiclePlate,
      notes: item.notes,
      status: item.status,
      adminComment: item.adminComment,
    };
  }
}