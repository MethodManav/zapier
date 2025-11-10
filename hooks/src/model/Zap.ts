import { model, Schema, type Types } from "mongoose";

export interface Zap {
  name: string;
  trigger: Types.ObjectId;
  actions: Types.ObjectId[];
  user: Types.ObjectId;
}

const zapSchema = new Schema<Zap>({
  name: { types: String, required: true },
  trigger: { type: Schema.Types.ObjectId, ref: "Trigger", required: true },
  actions: [{ type: Schema.Types.ObjectId, ref: "Action", required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
const Zap = model<Zap>("Zap", zapSchema);
export default Zap;
