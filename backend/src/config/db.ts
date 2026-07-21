import mongoose from 'mongoose'
import { MONGO_URI } from '../constants/env'
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Database connected successfully.")
    } catch (error) {
        console.log("Error connecting to the database", error)
        process.exit(1)
    }
}

export default connectDB