import dotenv from "dotenv";
import app from "./app.js";
import { testConnection } from "./db/pool.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
