import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { User } from '../user/user.model';

const bookingServiceIntoDB = async (
  userData: JwtPayload,
  booking: TBooking,
) => {
  const user = await User.isUserExistsByEmail(userData?.email);

  const bookingData = {
    ...booking,
    user: user._id.toString(), // Include user ID in the booking object
  };
  const result = (
    await (await Booking.create(bookingData)).populate('user')
  ).populate('car');
  return result;
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({});
  return result;
};

const getOrderByEmailFromDB = async (email: string) => {
  const result = await Booking.find({ email: email });
  return result;
};

const getMyBookingsFromDb = async (userData: JwtPayload) => {
  const user = await User.isUserExistsByEmail(userData?.email);
  const userId = user._id;
  const result = await Booking.find({ user: userId });
  return result;
};
export const BookingServices = {
  bookingServiceIntoDB,
  getAllBookingsFromDB,
  getOrderByEmailFromDB,
  getMyBookingsFromDb,
};
