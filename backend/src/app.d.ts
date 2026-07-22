import mongoose from "mongoose";

declare global {
    namespace Express {
        interface Request {
            userId: mongoose.Types.ObjectId
            sessionId: mongoose.Types.ObjectId
        }
    }
}

declare module "express" {
    interface Request {
        userId: mongoose.Types.ObjectId
        sessionId: mongoose.Types.ObjectId
    }
}

declare module "express-serve-static-core" {
    interface Request {
        userId: mongoose.Types.ObjectId
        sessionId: mongoose.Types.ObjectId
    }
}

export {}