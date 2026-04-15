import { Request, Response, NextFunction } from 'express';
import { CreateSlot } from '../../../application/use-cases/slot/CreateSlot';
import { GetAvailableSlots } from '../../../application/use-cases/slot/GetAvailableSlots';
import { sendSuccess } from '../response/ApiResponse';

export class SlotController {
  constructor(
    private readonly createSlot: CreateSlot,
    private readonly getAvailableSlots: GetAvailableSlots,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const slot = await this.createSlot.execute(req.body);
      sendSuccess(res, 201, 'Slot created successfully.', slot);
    } catch (error) {
      next(error);
    }
  };

  getAvailable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const date = String(req.query.date || '');
      const slots = await this.getAvailableSlots.execute(date);
      sendSuccess(res, 200, 'Available slots fetched successfully.', slots);
    } catch (error) {
      next(error);
    }
  };
}
