/* eslint-disable no-unused-vars */
import { Date, Model } from 'mongoose'

type IUserRole = 'user' | 'admin' | 'super-admin'

export type IUser = {
  username: string
  email: string
  password: string
  passwordChangedAt?: Date
  role: IUserRole
  name: {
    firstName: string
    lastName: string
  }
  phoneNumber: string
  address: string
  dateOfBirth: string
}

export type IUserMethods = {
  isUserExists(username: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
