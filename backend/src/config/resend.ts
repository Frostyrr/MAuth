import { Resend } from "resend";
import { RESEND_API_KEY } from "../constants/env";

export const getResendClient = () => {
    const apiKey = process.env.RESEND_API_KEY || RESEND_API_KEY;
    return new Resend(apiKey);
};

const resend = new Resend(process.env.RESEND_API_KEY || RESEND_API_KEY);

export default resend;