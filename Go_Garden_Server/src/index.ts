import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());

// http://localhost:5000/api
app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the TypeScript server!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
