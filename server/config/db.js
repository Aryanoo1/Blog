import mongoose from "mongoose";

async function db() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connecting to Database", err);
      });
  } catch (error) {
    console.log("Something is wrong", error);
  }
}

export default db;
