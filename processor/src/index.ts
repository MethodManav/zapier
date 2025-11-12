import { ZapRunOutbox } from "@zap/hooks";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();
  while (true) {
    console.log("Processing...");
    const pendingRows = await ZapRunOutbox.find().limit(10);
    pendingRows.forEach(async (row) => {
      try {
        await producer.send({
          topic: "zap-events",
          messages: [
            {
              key: row._id.toString(),
              value: JSON.stringify({
                userId: row.userId,
                zapRunId: row.zapRunId,
                metadata: row.metadata,
              }),
            },
          ],
        });
        await ZapRunOutbox.deleteOne({ _id: row._id });
      } catch (error) {}
    });
  }
}

main();
