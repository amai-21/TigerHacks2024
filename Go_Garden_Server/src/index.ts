import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import plantRoutes from "./Routes/PlantRoutes";

dotenv.config();
const app = express();
const helmet = require('helmet');
const PORT = 5000;

app.use(cors());

app.use(express.json());


// Routes
app.use("/api", plantRoutes);


app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://vercel.live"],
        connectSrc: ["'self'", "https://vercel.live"],
        imgSrc: ["'self'", "data:"],
        styleSrc: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});








