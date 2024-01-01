import { Request, Response } from "express"
import catchAsync from "../../../shared/catchAsync"
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";

const createUser = catchAsync( 
    async (req:Request, res:Response) => {
        const user = req.body;
       const result = await UserService.createUser(user)

        sendResponse<IUser>(res, {
            success: true,
            statusCode: 200,
            message: "user created successfully",
            data: result
        })
    }
)

export const UserController = {
    createUser
}