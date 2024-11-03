import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import plantRoutes from "./Routes/PlantRoutes";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

// Routes
app.use("/api", plantRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
