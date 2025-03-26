import { Types } from 'mongoose';

export type TBooking = {
  _id: Types.ObjectId;
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost: number;
};
