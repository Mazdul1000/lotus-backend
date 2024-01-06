import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import User from '../user/user.model'
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import { Secret } from 'jsonwebtoken'

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
  const { username: userName, role } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userName, role },
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

const refreshToken = async (token: string):Promise<IRefreshTokenResponse> => {
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

export const AuthService = {
  loginUser,
  refreshToken,
}
