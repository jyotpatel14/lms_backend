import express, { Request, Response } from "express";

const app = express();
const PORT = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
