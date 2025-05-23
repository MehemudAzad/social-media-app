/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE, USER_STATUS } from '../module/User/user.constant';
import AppError from '../errors/AppError';

// _id: user._id,
//     name: user.name,
//     email: user.email,
//     mobileNumber: user.mobileNumber,
//     role: user.role,
//     status: user.status,

export const createToken = (
  jwtPayload: {
    _id?: string;
    name: string;
    email: string;
    role: keyof typeof USER_ROLE;
    status: keyof typeof USER_STATUS;
  },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new AppError(401, 'You are not authorized!');
  }
};