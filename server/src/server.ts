import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string, {
      dbName: "Divine-Library",
    });
    console.log(`🛢 Database connected`);
    app.listen(config.port, () => {
      console.log("Divine Library server is running");
    });
  } catch (error) {
    console.log("Failed to connect Databese", error);
  }
}

boostrap();
