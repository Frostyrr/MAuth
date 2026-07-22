import "dotenv/config"
import dns from "dns"

// Set Node DNS resolution order to IPv4 first to prevent IPv6 TLS ECONNRESET timeouts on Cloudflare/Resend endpoints
dns.setDefaultResultOrder("ipv4first")

import express from 'express'
import connectDB from './config/db'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env"
import errorHandler from "./middleware/errorHandler"
import { OK } from "./constants/http"
import authRoutes from "./routes/auth.routes"
import { authenticate } from "./middleware/authenticate"
import userRoutes from "./routes/user.routes"
import sessionRoutes from "./routes/session.routes"

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

// protected routes
app.use("/user", authenticate, userRoutes)
app.use("/sessions", authenticate, sessionRoutes)

app.use(errorHandler)

app.listen(Number(PORT), async () => {
        console.log(`Server is running on PORT ${PORT} in ${NODE_ENV} environment`)
        await connectDB()
    }
)
