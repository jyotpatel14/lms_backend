import app from ".";
import pool from "./config/db";

const PORT = process.env.PORT || 3000;

pool
  .getConnection()
  .then(() => {
    console.log("Connected to MySQL database");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
