import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await User.find({});
  return result;
};

const getOrderByEmailFromDB = async (email: string) => {
  const result = await User.find({ email: email });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
