import { model, Schema, type Types } from "mongoose";

export interface IZapRun {
  userId: Types.ObjectId;
  zapId: Types.ObjectId;
  metadata: Record<string, any>;
  creationDate: Date;
}

const ZapRunSchema = new Schema<IZapRun>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  zapId: { type: Schema.Types.ObjectId, ref: "Zap", required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
  creationDate: { type: Date, default: Date.now },
});

export const ZapRun = model<IZapRun>("ZapRun", ZapRunSchema);

//Transactional outbox pattern

export interface IZapRunOutbox {
  userId: Types.ObjectId;
  zapRunId: Types.ObjectId;
  metadata: Record<string, any>;
  creationDate: Date;
}

const ZapRunOutboxSchema = new Schema<IZapRunOutbox>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  zapRunId: { type: Schema.Types.ObjectId, ref: "ZapRun", required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
  creationDate: { type: Date, default: Date.now },
});

export const ZapRunOutbox = model<IZapRunOutbox>(
  "ZapRunOutbox",
  ZapRunOutboxSchema
);
