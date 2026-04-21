import { BookingController } from '../../../src/ports/rest/controllers/BookingController';
import { createMockRequest, createMockResponse, createMockNext } from './testHelpers';
import { sendSuccess } from '../../../src/ports/rest/response/ApiResponse';

jest.mock('../../../src/ports/rest/response/ApiResponse', () => ({
  sendSuccess: jest.fn(),
}));

describe('BookingController', () => {
  let createGuestBookingMock: any;
  let createUserBookingMock: any;
  let getMyBookingsMock: any;
  let cancelBookingMock: any;
  let controller: BookingController;

  beforeEach(() => {
    createGuestBookingMock = { execute: jest.fn() };
    createUserBookingMock = { execute: jest.fn() };
    getMyBookingsMock = { execute: jest.fn() };
    cancelBookingMock = { execute: jest.fn() };

    controller = new BookingController(
      createGuestBookingMock,
      createUserBookingMock,
      getMyBookingsMock,
      cancelBookingMock
    );

    jest.clearAllMocks();
  });

  it('should create guest booking', async () => {
    const req = createMockRequest({ body: {} });
    const res = createMockResponse();
    const next = createMockNext();

    createGuestBookingMock.execute.mockResolvedValue({ id: '1' });

    await controller.createGuest(req, res, next);

    expect(createGuestBookingMock.execute).toHaveBeenCalledWith(req.body);
    expect(sendSuccess).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next on error', async () => {
    const req = createMockRequest({ body: {} });
    const res = createMockResponse();
    const next = createMockNext();

    const error = new Error('Guest booking failed');
    createGuestBookingMock.execute.mockRejectedValue(error);

    await controller.createGuest(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});