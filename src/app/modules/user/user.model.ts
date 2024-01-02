import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser>({
  username: {
    type: 'string',
    required: true,
    unique: true,
  },
  role: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  name: {
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
  },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
})



const User = model<IUser, UserModel>('User', userSchema);

export default User;