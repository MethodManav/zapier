import { Schema, type Types } from "mongoose";
import type { IEvent } from "./Trigger.js";

export interface IAction {
  AvailableAction: Types.ObjectId;
  event: IEvent;
  zapId: Types.ObjectId;
}

const ActionSchema = new Schema<IAction>({
  AvailableAction: {
    type: Schema.Types.ObjectId,
    ref: "AvailableTrigger",
    required: true,
  },
  event: {
    displayName: { type: String, required: true },
    eventId: { type: String, required: true },
  },
  zapId: { type: Schema.Types.ObjectId, ref: "Zap", required: true },
});

export const ActionModel = {
  name: "Action",
  schema: ActionSchema,
};
