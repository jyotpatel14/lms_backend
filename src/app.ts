//app.ts

import express from "express";
import userRoutes from "./routes/user.routes";
import { ApiResponse } from "./interfaces/response.interface";

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response<ApiResponse>,
    next: express.NextFunction
  ) => {
    res.status(500).json({
      success: false,
      code: 500,
      message: err.message,
    });
    next();
  }
);

export default app;
