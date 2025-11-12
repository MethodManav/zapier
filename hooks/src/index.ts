import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./model/DB.js";
import mongoose from "mongoose";
import { ZapRun, ZapRunOutbox } from "./model/ZapRun.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req: Request, res: Response) => {
  const { userId, zapId } = req.params;
  const { body } = req;
  if (!userId || !zapId) {
    return res.status(400).send("Missing userId or zapId");
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //put in zap run collection
    await ZapRun.create({
      userId: new mongoose.Types.ObjectId(userId),
      zapId: new mongoose.Types.ObjectId(zapId),
      metadata: body,
    });
    await ZapRunOutbox.create({
      userId: new mongoose.Types.ObjectId(userId),
      zapRunId: new mongoose.Types.ObjectId(zapId),
      metadata: body,
    });
    await session.commitTransaction();
    res.status(200).send("Hook caught");
  } catch (error) {
  } finally {
    await session.endSession();
  }
});

// 🚀 Start server
async function startServer() {
  await connectDB(process.env.MONGO_URI!);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

startServer();
export * from "./model/main.js";
