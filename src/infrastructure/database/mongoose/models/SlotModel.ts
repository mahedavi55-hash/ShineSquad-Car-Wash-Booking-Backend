import { Schema, model } from 'mongoose';

const slotSchema = new Schema(
  {
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    maxBookings: { type: Number, default: 1 },
    bookedCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const SlotModel = model('Slot', slotSchema);
