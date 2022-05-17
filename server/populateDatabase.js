import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/jobModel.js";

const populateDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await Job.deleteMany();
    const jsonData = JSON.parse(
      await readFile(new URL("./job-data.json", import.meta.url))
    );
    await Job.create(jsonData);
    console.log("Success!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

populateDB();
