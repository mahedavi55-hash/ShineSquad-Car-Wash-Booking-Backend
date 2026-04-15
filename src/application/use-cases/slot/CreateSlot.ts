import { ISlotRepository } from '../../../domain/repositories/ISlotRepository';
import { Slot } from '../../../domain/entities/Slot';

export class CreateSlot {
  constructor(private readonly slotRepository: ISlotRepository) {}

  async execute(input: Omit<Slot, 'id' | 'bookedCount'>): Promise<Slot> {
    return this.slotRepository.create({ ...input, bookedCount: 0 });
  }
}
