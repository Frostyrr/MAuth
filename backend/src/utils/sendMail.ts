import { getResendClient } from "../config/resend"
import { EMAIL_SENDER, NODE_ENV } from "../constants/env"

type Params = {
    to: string,
    subject: string,
    text: string,
    html: string,
}

const isDev = NODE_ENV.trim() === "development"

// During development, uses onboarding@resend.dev and delivered@resend.dev.
// In production (NODE_ENV=production), automatically uses EMAIL_SENDER and real user recipient email.
const getFromEmail = () => isDev ? "onboarding@resend.dev" : EMAIL_SENDER
const getToEmail = (to: string) => isDev ? "delivered@resend.dev" : to

export const sendMail = async ({ to, subject, text, html }: Params) => {
    const resend = getResendClient()
    const fromEmail = getFromEmail()
    const targetEmail = getToEmail(to)

    const response = await resend.emails.send({
        from: fromEmail,
        to: targetEmail,
        subject,
        text,
        html,
    })

    if (response.error) {
        console.error(`[Resend Error] Failed sending email to ${targetEmail} from ${fromEmail}:`, response.error)
    } else {
        console.log(`[Resend Success] Email delivered to ${targetEmail} (Message ID: ${response.data?.id})`)
    }

    return response
}