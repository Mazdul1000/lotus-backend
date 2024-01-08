import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import User from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
import { JwtPayload, Secret } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const loginUser = async (
  loginData: ILoginUser,
): Promise<ILoginUserResponse> => {
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
    !(await user.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(402, 'Password is incorrect')
  }

  // create jwt token and refresh token
  const { username: userName, role, _id } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { username, role, _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  )

  // refresh token
  const refreshToken = jwtHelpers.createToken(
    { username: userName, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User()

  let verfiedToken = null

  try {
    // verify token
    verfiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    )
  } catch (err) {
    throw new ApiError(403, 'Invalid refresh token')
  }

  // verfiy user
  const isUserExist = await user.isUserExists(verfiedToken?.username)
  if (!isUserExist) {
    throw new ApiError(500, 'User does not exists')
  }

  const { username, role } = isUserExist
  // create new access token
  const newAccessToken = jwtHelpers.createToken(
    { username, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken: newAccessToken,
  }
}

const changePassword = async (
  userData: JwtPayload | null,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // create instance for accessing methods
  const user = new User()

  // check user exists
  const isUserExist = await user.isUserExists(userData?.username)
  if (!isUserExist) {
    throw new ApiError(500, 'User does not exists')
  }

  // check old password
  if (
    isUserExist.password &&
    !(await user.isPasswordMatched(oldPassword, isUserExist?.password))
  ) {
    throw new ApiError(401, 'Password is incorrect')
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  // update password to database

  const updatedData = {
    password: newHashedPassword,
    passwordChangedAt: new Date(),
  }

  await User.findOneAndUpdate({ username: userData?.username }, updatedData)
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
