import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const loginUser = catchAsync(
    async (req: Request, res: Response) => {
       const { ...loginData } = req.body;
       const result = await AuthService.loginUser(loginData);

        sendResponse(res, {
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: result
        })
    }
)

export const AuthController = {
    loginUser
}