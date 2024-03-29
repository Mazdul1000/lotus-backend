import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { ServiceServices } from './service.service'
import sendResponse from '../../../shared/sendResponse'
import { IService } from './service.interface'
import { serviceFilterableFields } from './service.constants'
import pick from '../../../shared/pick'

const createService = catchAsync(async (req: Request, res: Response) => {
  const data = req.body
  const result = await ServiceServices.createService(data)

  sendResponse<IService>(res, {
    success: true,
    statusCode: 200,
    message: 'New service created successfully',
    data: result,
  })
})

const getAllServices = catchAsync(
  // eslint-disable-next-line no-unused-vars
  async (req: Request, res: Response) => {
    const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
    const filters = pick(req.query, serviceFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await ServiceServices.getAllServices(
      filters,
      paginationOptions,
    )

    sendResponse<IService[]>(res, {
      success: true,
      statusCode: 200,
      message: 'Services data retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  },
)

const getSingleService = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const result = await ServiceServices.getSingleService(id)

    sendResponse<IService>(res, {
      success: true,
      statusCode: 200,
      message: 'Service info retrieved successfully',
      data: result,
    })
  },
)

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const data = req.body
  const result = await ServiceServices.updateService(id, data)

  sendResponse<IService>(res, {
    success: true,
    statusCode: 200,
    message: 'Service updated succesfully',
    data: result,
  })
})

const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ServiceServices.deleteService(id)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Service deleted successfully',
    data: result,
  })
})

export const ServiceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
}
