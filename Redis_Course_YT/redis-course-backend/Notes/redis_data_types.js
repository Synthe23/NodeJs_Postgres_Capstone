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

  //| 1> String
  const stringKey = "demo:page_views";
  await redis.set(stringKey, "100");
  const pageViews = await redis.get(stringKey);
  console.log(pageViews);

  //| 2> redis strings can also work like counters
  // Increase the above value to 100 -> 101
  const afterIncrement = await redis.incr(stringKey);
  console.log(afterIncrement);

  //| 3> Hash can store many small fields under one key
  // Like small object or map inside redis
  // key: keyname
  // object_name -> 'Omm'
  // email -> "email"
  const hashKey = "demo:user:profile";
  await redis.hSet(hashKey, {
    name: "Omm",
    city: "USA",
  });
  const extractProfileInfo = await redis.hGetAll(hashKey);
  console.log(extractProfileInfo);

  //| List
  // redis list is ordered collection of values
  //N lpush - It adds the last inserted item at the beginning
  //N lRange - reads item from the list
  //N rPush - adds the item at end
  //N lTrim - keeps only part of the list
  const listKey = "demo:messages";
  await redis.lPush(listKey, "hello");
  await redis.lPush(listKey, "hi, redis");
  const extractMessages = await redis.lRange(listKey, 0, -1); // listkey, start, stop
  console.log(extractMessages);
}

run().catch((error) => {
  console.error("Demo test failed:", error);
  process.exit(1);
});
