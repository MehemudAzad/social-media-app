import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getUserByIdFromDB = async (id: string) => {
  return await User.findById(id);
};

const getAllUsersFromDB = async () => {
  return await User.find({});
};

export const UserServices = {
  createUserIntoDB,
  getUserByIdFromDB,
  getAllUsersFromDB,
};

