import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Arpit:Arpit123456789@cluster0.y92c6.mongodb.net/Project-2",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Error in connecting to Database:", err.message);
    process.exit(1);
  }
};
