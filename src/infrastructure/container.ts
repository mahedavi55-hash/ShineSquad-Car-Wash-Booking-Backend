import { UserRepository } from './database/mongoose/repositories/UserRepository';
import { ServiceRepository } from './database/mongoose/repositories/ServiceRepository';
import { SlotRepository } from './database/mongoose/repositories/SlotRepository';
import { BookingRepository } from './database/mongoose/repositories/BookingRepository';
import { RegisterUser } from '../application/use-cases/auth/RegisterUser';
import { LoginUser } from '../application/use-cases/auth/LoginUser';
import { CreateService } from '../application/use-cases/service/CreateService';
import { GetServices } from '../application/use-cases/service/GetServices';
import { CreateSlot } from '../application/use-cases/slot/CreateSlot';
import { GetAvailableSlots } from '../application/use-cases/slot/GetAvailableSlots';
import { CreateGuestBooking } from '../application/use-cases/booking/CreateGuestBooking';
import { CreateUserBooking } from '../application/use-cases/booking/CreateUserBooking';
import { GetMyBookings } from '../application/use-cases/booking/GetMyBookings';
import { CancelBooking } from '../application/use-cases/booking/CancelBooking';
import { ApproveBooking } from '../application/use-cases/admin/ApproveBooking';
import { DeclineBooking } from '../application/use-cases/admin/DeclineBooking';
import { CompleteBooking } from '../application/use-cases/admin/CompleteBooking';
import { GetBookingAnalytics } from '../application/use-cases/admin/GetBookingAnalytics';
import { RescheduleBooking } from '../application/use-cases/admin/RescheduleBooking';
import { AuthController } from '../ports/rest/controllers/AuthController';
import { ServiceController } from '../ports/rest/controllers/ServiceController';
import { SlotController } from '../ports/rest/controllers/SlotController';
import { BookingController } from '../ports/rest/controllers/BookingController';
import { AdminController } from '../ports/rest/controllers/AdminController';

const userRepository = new UserRepository();
const serviceRepository = new ServiceRepository();
const slotRepository = new SlotRepository();
const bookingRepository = new BookingRepository();

const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);
const createService = new CreateService(serviceRepository);
const getServices = new GetServices(serviceRepository);
const createSlot = new CreateSlot(slotRepository);
const getAvailableSlots = new GetAvailableSlots(slotRepository);
const createGuestBooking = new CreateGuestBooking(
  bookingRepository,
  serviceRepository,
  slotRepository
);
const createUserBooking = new CreateUserBooking(
  bookingRepository,
  serviceRepository,
  slotRepository
);
const getMyBookings = new GetMyBookings(bookingRepository);
const cancelBooking = new CancelBooking(bookingRepository);

const approveBooking = new ApproveBooking(bookingRepository);
const declineBooking = new DeclineBooking(bookingRepository);
const completeBooking = new CompleteBooking(bookingRepository);
const getBookingAnalytics = new GetBookingAnalytics(bookingRepository);
const rescheduleBooking = new RescheduleBooking(bookingRepository, slotRepository);

export const authController = new AuthController(registerUser, loginUser);
export const serviceController = new ServiceController(createService, getServices);
export const slotController = new SlotController(createSlot, getAvailableSlots);
export const bookingController = new BookingController(
  createGuestBooking,
  createUserBooking,
  getMyBookings,
  cancelBooking
);
export const adminController = new AdminController(
  approveBooking,
  declineBooking,
  completeBooking,
  getBookingAnalytics,
  rescheduleBooking
);