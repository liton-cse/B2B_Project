import { Model } from 'mongoose';
import { USER_ROLES } from '../../../enums/user';
export interface IQueryOptions {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}
export type IUser = {
  name: string;
  businessType: string;
  businessName: string;
  role: USER_ROLES;
  contact: string;
  email: string;
  password: string;
  fcmToken: string;
  businessAddress: string;
  image?: string;
  status: 'pending' | 'approve' | 'reject' | 'block' | 'unblock';
  customerType: string;
  isActive: 'active' | 'inActive';
  verified: boolean;
  authentication?: {
    isResetPassword: boolean;
    oneTimeCode: number;
    expireAt: Date;
  };
};

export type UserModal = {
  isExistUserById(id: string): any;
  isExistUserByEmail(email: string): any;
  isMatchPassword(password: string, hashPassword: string): boolean;
} & Model<IUser>;
