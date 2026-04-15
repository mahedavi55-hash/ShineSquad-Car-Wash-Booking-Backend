import { GetBookingAnalytics } from '../../src/application/use-cases/admin/GetBookingAnalytics';
import { BookingStatus } from '../../src/domain/enums/BookingStatus';

describe('GetBookingAnalytics', () => {
  test('returns booking counts by status', async () => {
    const bookingRepository = {
      findAll: jest.fn().mockResolvedValue([
        { status: BookingStatus.PENDING },
        { status: BookingStatus.APPROVED },
        { status: BookingStatus.APPROVED },
        { status: BookingStatus.COMPLETED },
      ]),
    } as any;

    const useCase = new GetBookingAnalytics(bookingRepository);
    const result = await useCase.execute();

    expect(result.totalBookings).toBe(4);
    expect(result.pendingBookings).toBe(1);
    expect(result.approvedBookings).toBe(2);
    expect(result.completedBookings).toBe(1);
  });
});
