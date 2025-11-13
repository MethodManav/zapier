import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-worker",
  brokers: ["localhost:9092"],
});

async function main() {
  const consumer = kafka.consumer({ groupId: "worker-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "zap-events", fromBeginning: true });
  while (true) {
    console.log("Waiting for messages...");
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
        console.log(`- ${prefix} ${message.key}#${message.value}`);
        await consumer.commitOffsets([
          { topic, partition, offset: (Number(message.offset) + 1).toString() },
        ]);
      },
    });
  }
}

main();
