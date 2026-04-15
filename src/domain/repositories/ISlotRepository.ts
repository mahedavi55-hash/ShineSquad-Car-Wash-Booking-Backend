import { Slot } from '../entities/Slot';

export interface ISlotRepository {
  create(slot: Slot): Promise<Slot>;
  findAvailableByDate(date: string): Promise<Slot[]>;
  findById(id: string): Promise<Slot | null>;
  incrementBookingCount(id: string): Promise<void>;
}
