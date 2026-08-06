import { createApp } from "./app.js";
import { logger } from "./lib/logger.js";
import { env } from "./config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(`Server is now running on the PORT ${env.PORT} ✅`);
});
