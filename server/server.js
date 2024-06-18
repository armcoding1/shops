import app from "./app.js";
import mongoose from "mongoose";
import "dotenv/config.js";

(async () => {
  try {
    const { MONGO_URL, PORT } = process.env;

    await mongoose.connect(MONGO_URL);
    console.log("DB is successfully connected!");

    app.listen(PORT, () => {
      console.log("Server is running...");
    });
  } catch (error) {
    console.error("Something went wrong", error);
    process.exit(1);
  }
})();
