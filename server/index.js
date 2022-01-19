import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";

import authRouter from "./routes/routers.js";

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json({ extended: true }));
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
