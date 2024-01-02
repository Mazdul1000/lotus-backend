import { IService } from "./service.interface"
import Service from "./service.model"

const createService = async(payload: IService):Promise<IService | null> => {
    const result = await Service.create(payload);
    return result
}

const getAllServices = async() => {

    // filtering and searching functionalites

    const result = await Service.find();
    return result
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