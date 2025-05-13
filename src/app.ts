import express from "express";
import userRoutes from "./routes/user.routes";
import { ApiResponse } from "./interfaces/response.interface";

const app = express();

app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Error handling middleware
app.use(
  (err: Error, req: express.Request, res: express.Response<ApiResponse>) => {
    res.status(500).json({
      success: false,
      code: 500,
      message: err.message,
    });
  }
);

export default app;
