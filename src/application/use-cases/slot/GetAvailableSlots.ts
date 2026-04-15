import { ISlotRepository } from '../../../domain/repositories/ISlotRepository';
import { Slot } from '../../../domain/entities/Slot';

export class GetAvailableSlots {
  constructor(private readonly slotRepository: ISlotRepository) {}

  async execute(date: string): Promise<Slot[]> {
    return this.slotRepository.findAvailableByDate(date);
  }
}
