import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { UserService } from './user.service'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './user.interface'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body
  const result = await UserService.createUser(user)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: 200,
    message: 'user created successfully',
    data: result,
  })
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers()

  sendResponse<IUser[]>(res, {
    success: true,
    statusCode: 200,
    message: 'User list retrived successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const result = await UserService.getSingleUser(id)

    sendResponse<IUser>(res, {
      success: true,
      statusCode: 200,
      message: 'User data retrieved successfully',
      data: result,
    })
  },
)

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user
  const { username } = req.params
  const data = req.body
  const result = await UserService.updateUser(user, username, data)

  sendResponse<IUser>(res, {
    success: true,
    statusCode: 200,
    message: 'User data updated succesfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { username } = req.params
  const result = await UserService.deleteUser(username)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
