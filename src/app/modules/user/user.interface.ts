import { Model } from 'mongoose';

type IUserRole = 'user' | 'admin' | 'super-admin';

export type IUser = {
  username: string;
  email: string;  
  password: string;
  role: IUserRole;
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
