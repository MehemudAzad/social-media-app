import { Model, Types } from 'mongoose';
import { USER_ROLE, USER_STATUS } from './user.constant';

export interface TUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  role: keyof typeof USER_ROLE;
  status: keyof typeof USER_STATUS;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  isVerified?: boolean;
  isDeleted?: boolean;
  passwordChangedAt?: Date;
  premiumUser?: boolean;
  createdAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExistsById(id: string): Promise<TUser | null>;
  isUserExistsByEmail(email: string): Promise<TUser | null>;
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}


export type TUserRole = keyof typeof USER_ROLE;
