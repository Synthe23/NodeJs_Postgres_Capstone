import dotenv from "dotenv";
import { error } from "node:console";
import { createClient } from "redis";

dotenv.config();
const redisUrl = process.env.REDIS_URL || "redis://localhost:6300";
const redis = createClient({ url: redisUrl });

async function run() {
  // open the connection to the redis server
  await redis.connect();
  console.log("Connected to the redis!");
  console.log("ping", await redis.ping());

  // String
  const stringKey = "demo:page_views";
  await redis.set(stringKey, "100");
  const pageViews = await redis.get(stringKey);
  console.log(pageViews);
}

run().catch((error) => {
  console.error("Demo test failed:", error);
  process.exit(1);
});
