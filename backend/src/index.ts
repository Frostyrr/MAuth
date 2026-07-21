import "dotenv/config"
import express from 'express'
import connectDB from './config/db'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env"
import errorHandler from "./middleware/ErrorHandler"
import { OK } from "./constants/http.ts"
import authRoutes from "./routes/auth.routes.ts"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true
    })
)

app.use(cookieParser())

app.get("/", (req, res, next) => {
    res.status(OK).json({
        status: "Good.",
    })
})

app.use("/auth", authRoutes)

app.use(errorHandler)

app.listen(Number(PORT), async () => {
        console.log(`Server is running on PORT ${PORT} in ${NODE_ENV} environment`)
        await connectDB()
    }
)
