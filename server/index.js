import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "express-async-errors";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import express from "express";
const app = express();

import morgan from "morgan";
dotenv.config();

//routes
import authRouter from "./routes/authRouter.js";
import jobsRouter from "./routes/jobsRouter.js";

//middleware
import notFoundError from "./middleware/notFoundError.js";
import errorHandler from "./middleware/handleError.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/users", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFoundError);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const mongooseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

mongooseConnection();
