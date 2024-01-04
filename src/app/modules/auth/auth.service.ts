import ApiError from '../../../errors/ApiError'
import User from '../user/user.model'
import { ILoginUser } from './auth.interface'

const loginUser = async (loginData: ILoginUser) => {
  const { username, password } = loginData

  const user = new User()

  // check user exists
  const isUserExist = await user.isUserExists(username)
  if (!isUserExist) {
    throw new ApiError(500, 'User does not exists')
  }

  // match password
  if (
    isUserExist.password &&
    !user.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(402, 'Password is incorrect')
  }

  // create jwt token


  return {
    isUserExist
  }
}

export const AuthService = {
  loginUser,
}
