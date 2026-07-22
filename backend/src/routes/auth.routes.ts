import { Router } from "express"
import { logoutHandler, loginHandler, registerHandler, refreshHandler, verifyEmailHandler, sendVerificationEmailHandler, sendPasswordResetEmailHandler, resetPasswordHandler } from "../controllers/auth.controller"

const authRoutes = Router()

authRoutes.post("/register", registerHandler)
authRoutes.post("/login", loginHandler)
authRoutes.get("/refresh", refreshHandler)
authRoutes.get("/logout", logoutHandler)
authRoutes.get("/email/verify/:code", verifyEmailHandler)
authRoutes.post("/email/resend", sendVerificationEmailHandler)
authRoutes.post("/password/forgot", sendPasswordResetEmailHandler)
authRoutes.post("/password/reset", resetPasswordHandler)

export default authRoutes