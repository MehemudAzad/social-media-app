import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  city: string;
  dateFound: string;
  status: string;
  isReported: boolean;
  reportCount: number;
  category: ICategory;
  user: IUser;
  questions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface ICategory {
//   _id: string;
//   name: string;
//   postCount: number;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }

export interface IUser {
  _id: string;
  username: string;
  email?: string;
  password?: string;
  profilePicture?: string;
  role?: string;
  followers?: string[]; // Assuming followers are stored as an array of user IDs
  following?: string[]; // Assuming following users are stored as an array of user IDs
  isVerified?: boolean;
  premiumUser?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
