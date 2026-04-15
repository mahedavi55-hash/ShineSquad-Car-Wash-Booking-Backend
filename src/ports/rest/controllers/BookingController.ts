import { Request, Response, NextFunction } from 'express';
import { CreateGuestBooking } from '../../../application/use-cases/booking/CreateGuestBooking';
import { CreateUserBooking } from '../../../application/use-cases/booking/CreateUserBooking';
import { GetMyBookings } from '../../../application/use-cases/booking/GetMyBookings';
import { CancelBooking } from '../../../application/use-cases/booking/CancelBooking';
import { sendSuccess } from '../response/ApiResponse';

export class BookingController {
  constructor(
    private readonly createGuestBooking: CreateGuestBooking,
    private readonly createUserBooking: CreateUserBooking,
    private readonly getMyBookings: GetMyBookings,
    private readonly cancelBooking: CancelBooking,
  ) {}

  createGuest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.createGuestBooking.execute(req.body);
      sendSuccess(res, 201, 'Guest booking created successfully.', booking);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.createUserBooking.execute({ ...req.body, userId: req.user!.id });
      sendSuccess(res, 201, 'Booking created successfully.', booking);
    } catch (error) {
      next(error);
    }
  };

  getMine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const bookings = await this.getMyBookings.execute(req.user!.id);
      sendSuccess(res, 200, 'Bookings fetched successfully.', bookings);
    } catch (error) {
      next(error);
    }
  };

  cancel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const booking = await this.cancelBooking.execute(req.params.id);
      sendSuccess(res, 200, 'Booking cancelled successfully.', booking);
    } catch (error) {
      next(error);
    }
  };
}
