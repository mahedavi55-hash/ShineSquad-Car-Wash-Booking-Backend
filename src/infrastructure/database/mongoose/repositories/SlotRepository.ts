import { ISlotRepository } from '../../../../domain/repositories/ISlotRepository';
import { Slot } from '../../../../domain/entities/Slot';
import { SlotModel } from '../models/SlotModel';

export class SlotRepository implements ISlotRepository {
  async create(slot: Slot): Promise<Slot> {
    const saved = await SlotModel.create(slot);
    return { id: saved.id, date: saved.date, startTime: saved.startTime, endTime: saved.endTime, maxBookings: saved.maxBookings, bookedCount: saved.bookedCount, isActive: saved.isActive };
  }

  async findAvailableByDate(date: string): Promise<Slot[]> {
    const slots = await SlotModel.find({ date, isActive: true, $expr: { $lt: ['$bookedCount', '$maxBookings'] } });
    return slots.map((item) => ({ id: item.id, date: item.date, startTime: item.startTime, endTime: item.endTime, maxBookings: item.maxBookings, bookedCount: item.bookedCount, isActive: item.isActive }));
  }

  async findById(id: string): Promise<Slot | null> {
    const found = await SlotModel.findById(id);
    return found ? { id: found.id, date: found.date, startTime: found.startTime, endTime: found.endTime, maxBookings: found.maxBookings, bookedCount: found.bookedCount, isActive: found.isActive } : null;
  }

  async incrementBookingCount(id: string): Promise<void> {
    await SlotModel.findByIdAndUpdate(id, { $inc: { bookedCount: 1 } });
  }
}
