import { Booking } from '../booking/booking.model';
import { TCar } from './car.interface';
import { Car } from './car.model';
// import { TBooking } from '../booking/booking.interface';

const carServiceIntoDB = async (car: TCar) => {
  const result = await Car.create(car);
  return result;
};

const getAllCarsFromDB = async () => {
  const result = await Car.find({});
  return result;
};

const getSingleCarsFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateSingleCarFromDB = async (id: string, payload: Partial<TCar>) => {
  const updatedCar = await Car.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true, runValidators: true },
  );
  return updatedCar;
};

const deleteSingleCarFromDB = async (id: string) => {
  const deletedCar = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return deletedCar;
};

const returnCarIntoDB = async (payload: Record<string, unknown>) => {
  const { bookingId, endTime } = payload;
  const bookingInvolved = await Booking.findOne({ _id: bookingId });
  if (!bookingInvolved) {
    throw new Error('Booking not found');
  }

  const carInvolved = await Car.findOne({ _id: bookingInvolved?.car });
  if (!carInvolved) {
    throw new Error('Car not found');
  }

  // Ensuring startTime and endTime are in the correct format and calculate the duration
  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const startTimeCar = parseTime(bookingInvolved.startTime);
  const endTimeCar = parseTime(endTime as string);
  const durationInHours = (endTimeCar - startTimeCar) / 60;

  // Calculate the total cost
  const totalCost = carInvolved.pricePerHour * durationInHours;

  const result = await Booking.findByIdAndUpdate(
    { _id: bookingId },
    { $set: { endTime: endTime, totalCost: totalCost } },
    { new: true },
  )
    .populate('user')
    .populate('car');

  return result;
};

export const CarServices = {
  carServiceIntoDB,
  getAllCarsFromDB,
  getSingleCarsFromDB,
  updateSingleCarFromDB,
  deleteSingleCarFromDB,
  returnCarIntoDB,
};
