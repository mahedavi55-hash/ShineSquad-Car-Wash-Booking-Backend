export interface Slot {
  id?: string;
  date: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  bookedCount: number;
  isActive: boolean;
}
