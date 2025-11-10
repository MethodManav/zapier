import { Schema, type Types } from "mongoose";

export interface ITrigger {
  type: Types.ObjectId;
  event: IEvent;
  zapId: Types.ObjectId;
}

export interface IEvent {
  displayName: string;
  eventId: string;
}

const TriggerSchema = new Schema<ITrigger>({
  type: {
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

export const TriggerModel = {
  name: "Trigger",
  schema: TriggerSchema,
};
