import { JwtPayload } from 'jsonwebtoken'
import { IUser } from './user.interface'
import User from './user.model'
import ApiError from '../../../errors/ApiError'

const createUser = async (payload: IUser): Promise<IUser | null> => {
  const result = await User.create(payload)
  return result
}

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

const getSingleUser = async (payload: string): Promise<IUser | null> => {
  const result = await User.findById(payload)
  return result
}

const updateUser = async (
  userData: JwtPayload | null,
  username: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  // create instance for accessing methods
  const user = new User()

  // check user exists
  const isUserExist = await user.isUserExists(userData?.username)
  if (!isUserExist) {
    throw new ApiError(500, 'User does not exists')
  }

  // verify user
  if (userData?.role === 'user' && userData.username !== username) {
    throw new ApiError(401, 'Access denied')
  }

  // update data to database
  const result = await User.findOneAndUpdate(
    { username: userData?.username },
    payload,
  )

  return result
}

const deleteUser = async (payload: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ username: payload })
  return result
}

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
