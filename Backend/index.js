import express from "express";
import cookie from "cookie-parser";
import cors from "cors";
const app = express();
import { connectDb } from "./db/Connectdb.js";
import authRoutes from "./Routes/auth.routes.js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 4010;

// Middleware: Parsing Data from the body

app.use(express.json()); // Fixed missing parentheses to invoke express.json()
app.use(express.urlencoded({ extended: true }));
app.use(cookie());


app.use(
  cors({
    origin: "http://localhost:5174", // ✅ Allow frontend URL
    credentials: true, // ✅ Allow cookies/session authentication
  })
);

// Root Route to check server status
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Middleware: Authentication Routes
app.use("/api/auth", authRoutes);

// Start the server and connect to the database
app.listen(PORT, async () => {
  await connectDb(); // Ensure database connection is awaited
  console.log(`Server is running on port ${PORT}`);
});
