import { BookingRules } from '../../src/domain/services/BookingRules';

describe('BookingRules', () => {
  test('throws when service is inactive', () => {
    expect(() => BookingRules.ensureServiceIsBookable({ id: '1', name: 'Basic', description: 'desc', price: 20, durationMinutes: 30, isActive: false })).toThrow();
  });

  test('throws when slot is full', () => {
    expect(() => BookingRules.ensureSlotIsBookable({ id: '1', date: '2026-04-20', startTime: '10:00', endTime: '10:30', maxBookings: 1, bookedCount: 1, isActive: true })).toThrow();
  });

  test('accepts valid vehicle details', () => {
    expect(() => BookingRules.ensureVehicleDetails('SUV', 'Toyota RAV4', 'ABC123')).not.toThrow();
  });
});
