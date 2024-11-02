import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routes/UserRoute";
dotenv.config();
const app = express();
const PORT = 5000;
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (undefined !== MONGODB_URI) {
  app.use(cors());
  // Middleware
  app.use(express.json());

  // Routes
  app.use("/api", userRoutes);

  // Connect to MongoDB Atlas
  mongoose
    .connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("MongoDB connection error:", error));

  // http://localhost:5000/api
  app.get("/api", (req: Request, res: Response) => {
    res.json({ message: "Hello from the TypeScript server!" });
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} else {
  console.error("MONGODB_URI is not defined in the environment variables.");
}
