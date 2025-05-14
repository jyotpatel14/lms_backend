//server.ts

import express from "express";
import "./config/db";
// import "./index";

import app from "./app";

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("LMS Backend Running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
