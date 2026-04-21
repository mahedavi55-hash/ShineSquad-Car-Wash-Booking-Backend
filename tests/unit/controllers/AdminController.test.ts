import { AdminController } from '../../../src/ports/rest/controllers/AdminController';
import { createMockRequest, createMockResponse, createMockNext } from './testHelpers';
import { sendSuccess } from '../../../src/ports/rest/response/ApiResponse';

jest.mock('../../../src/ports/rest/response/ApiResponse', () => ({
  sendSuccess: jest.fn(),
}));

describe('AdminController', () => {
  let approveBookingMock: any;
  let declineBookingMock: any;
  let completeBookingMock: any;
  let getBookingAnalyticsMock: any;
  let rescheduleBookingMock: any;
  let controller: AdminController;

  beforeEach(() => {
    approveBookingMock = { execute: jest.fn() };
    declineBookingMock = { execute: jest.fn() };
    completeBookingMock = { execute: jest.fn() };
    getBookingAnalyticsMock = { execute: jest.fn() };
    rescheduleBookingMock = { execute: jest.fn() };

    controller = new AdminController(
      approveBookingMock,
      declineBookingMock,
      completeBookingMock,
      getBookingAnalyticsMock,
      rescheduleBookingMock
    );

    jest.clearAllMocks();
  });

  it('should approve booking', async () => {
    const req = createMockRequest({ params: { id: '1' } });
    const res = createMockResponse();
    const next = createMockNext();

    approveBookingMock.execute.mockResolvedValue({ id: '1' });

    await controller.approve(req, res, next);

    expect(approveBookingMock.execute).toHaveBeenCalledWith('1');
    expect(sendSuccess).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next on error', async () => {
    const req = createMockRequest({ params: { id: '1' } });
    const res = createMockResponse();
    const next = createMockNext();

    const error = new Error('Approve failed');
    approveBookingMock.execute.mockRejectedValue(error);

    await controller.approve(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});