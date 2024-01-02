import { paginationHelper } from "../../../helpers/paginationHelpers";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { serviceSearchableFields } from "./service.constants";
import { IService, IServiceFilters } from "./service.interface"
import Service from "./service.model"

const createService = async(payload: IService):Promise<IService | null> => {
    const result = await Service.create(payload);
    return result
}

const getAllServices = async(
    filters: IServiceFilters,
    paginationOptions: IPaginationOptions
) => {

    const { searchTerm, category, location } = filters;

    const andConditions = [];
  
    if (searchTerm !== undefined) {
      andConditions.push({
        $or: serviceSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      });
    }
  
    if (location !== undefined) {
      andConditions.push({
        location: {
          $regex: new RegExp(`^${location}$`, 'i'),
        },
      });
    }

    if (category !== undefined) {
      andConditions.push({
        location: {
          $regex: new RegExp(`^${category}$`, 'i'),
        },
      });
    }
  
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper.calculatePagination(paginationOptions);
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortObject: Record<string, any> = {};
    if (sortBy && sortOrder) {
      sortObject[sortBy] = sortOrder;
    }
  
    const whereCondition =
      andConditions.length > 0 ? { $and: andConditions } : {};
  
    const result = await Service.find(whereCondition)
      .sort(sortObject)
      .skip(skip)
      .limit(limit);
  
    const total = await Service.countDocuments();
    const responseData = {
      meta: {
        page,
        limit,
      } as { page: number; limit: number; total?: number },
      data: result,
    };
  
    if (andConditions.length === 0) {
      responseData.meta.total = total;
    } 
    return responseData;
}

const getSingleService = async(payload:string):Promise<IService |null> => {
    const result = await Service.findById(payload);
    return result;
}

const updateService = async (id: string, payload:Partial<IService>):Promise<IService |null> => {
    const result = await Service.findOneAndUpdate({ _id: id}, payload, { new: true });
    return result;
}

const deleteService = async(payload:string):Promise<IService |null> => {
    const result = await Service.findOneAndDelete({_id: payload});
    return result;
}

export const ServiceServices = {
    createService,
    getAllServices,
    getSingleService,
    updateService,
    deleteService
}