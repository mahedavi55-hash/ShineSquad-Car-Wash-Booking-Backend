import { Request, Response, NextFunction } from 'express';
import { ApproveBooking } from '../../../application/use-cases/admin/ApproveBooking';
import { DeclineBooking } from '../../../application/use-cases/admin/DeclineBooking';
import { CompleteBooking } from '../../../application/use-cases/admin/CompleteBooking';
import { GetBookingAnalytics } from '../../../application/use-cases/admin/GetBookingAnalytics';
import { RescheduleBooking } from '../../../application/use-cases/admin/RescheduleBooking';
import { sendSuccess } from '../response/ApiResponse';

export class AdminController {
  constructor(
    private readonly approveBooking: ApproveBooking,
    private readonly declineBooking: DeclineBooking,
    private readonly completeBooking: CompleteBooking,
    private readonly getBookingAnalytics: GetBookingAnalytics,
    private readonly rescheduleBooking: RescheduleBooking,
  ) {}

  approve = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.approveBooking.execute(String(req.params.id));
      sendSuccess(res, 200, 'Booking approved successfully.', booking);
    } catch (error) {
      next(error);
    }
  };

  decline = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.declineBooking.execute(
        String(req.params.id),
        req.body.adminComment
      );
      sendSuccess(res, 200, 'Booking declined successfully.', booking);
    } catch (error) {
      next(error);
    }
  };

  complete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.completeBooking.execute(String(req.params.id));
      sendSuccess(res, 200, 'Booking marked as completed.', booking);
    } catch (error) {
      next(error);
    }
  };

  reschedule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.rescheduleBooking.execute(
        String(req.params.id),
        req.body.slotId
      );
      sendSuccess(res, 200, 'Booking rescheduled successfully.', booking);
    } catch (error) {
      next(error);
    }
  };

  analytics = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const summary = await this.getBookingAnalytics.execute();
      sendSuccess(res, 200, 'Analytics fetched successfully.', summary);
    } catch (error) {
      next(error);
    }
  };
}