import { model, Schema, type Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  zaps: Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  zaps: [{ type: Schema.Types.ObjectId, ref: "Zap" }],
});

const User = model<IUser>("User", userSchema);
export default User;
