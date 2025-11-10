import { model, Schema } from "mongoose";

export interface IAvailableTrigger {
  displayName: string;
}

const AvailableTriggerSchema = new Schema<IAvailableTrigger>({
  displayName: { type: String, required: true },
});

export const AvailableTrigger = model<IAvailableTrigger>(
  "AvailableTrigger",
  AvailableTriggerSchema
);
