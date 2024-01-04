import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import config from "../../../config";


const loginUser = catchAsync(
    async (req: Request, res: Response) => {
       const { ...loginData } = req.body;
       const result = await AuthService.loginUser(loginData);
       const { refreshToken, ...data } = result;

    //    set refresh token into cookie
    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('refreshToken', refreshToken, cookieOptions);

        sendResponse<ILoginUserResponse>(res, {
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: data
        })
    }
)

export const AuthController = {
    loginUser
}