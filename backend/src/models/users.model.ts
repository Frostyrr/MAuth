import mongoose from "mongoose"
import { string } from "zod"
import { hashValue } from "../utils/bcrypt"

export interface UserDocument extends mongoose.Document {
    email: string
    password: string
    verified: Boolean
    createdAt: Date
    updatedAt: Date
    comparePassword(val:string): Promise<boolean>
}

const userSchema = new mongoose.Schema<UserDocument>({
    email: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    verified: { type: Boolean, default: false }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  return next();
});

userSchema.methods.comparePassword = async function(val: string) {
    return compareValue(val, this.password)
}

const UserModel = mongoose.model<UserDocument>("User", userSchema)
export default UserModel