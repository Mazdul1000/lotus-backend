/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

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

userSchema.pre('save', async function(next){
  const user = this;
  // hashing user password
   user.password = await bcrypt.hash(user.password,Number( config.bcrypt_salt_rounds))
  next()
})

const User = model<IUser, UserModel>('User', userSchema);

export default User;