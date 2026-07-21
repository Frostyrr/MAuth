import { jwt } from "zod"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env"
import VerificationCodeType from "../constants/verificationCodeTypes"
import SessionModel from "../models/sessions.model"
import UserModel from "../models/users.model"
import VerificationCodeModel from "../models/verificationCode.model"
import { oneYearFromNow } from "../utils/date"

export type CreateAccountParams = {
    email: string,
    password: string,
    userAgent?: string
}
export const createAccount = async(data:CreateAccountParams) => {
    // verify if user exists
    const existingUser = await UserModel.exists({
        email: data.email
        
        if (existingUser) {
            throw new Error("User already exists.")
        }
    })

    // create user
    const user = await UserModel.create({
        email: data.email,
        password: data.password
    })

    // verification code
    const verificationCode = await VerificationCodeModel.create({
        userId: user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow()
    })
    // send code for verification email 

    // create session
    const session = await SessionModel.create({
        userId: user._id,
        userAgent: data.userAgent,
    })

    // sign jwt and refresh tokens
    const refreshToken = jwt.sign(
        { sessionId: session._id },
        JWT_REFRESH_SECRET,{
            audience: ["user"],
            expiresIn: "30d",
        }
    )

    const accessToken = jwt.sign(
        {
            userId: user._id,
            sessionId: session._id 
        },
        JWT_SECRET,{
            audience: ["user"],
            expiresIn: "15m",
        }
    )

    // return user and access token
    return {
        user, accessToken, refreshToken
    }
}