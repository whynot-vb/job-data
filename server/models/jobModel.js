import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  jobName: {
    type: String,
    minLength: [3, "Job name must have at least 3 characters"],
    maxLength: [70, "Job name must have at most 70 characters"],
    trim: true,
    required: true,
  },
  companyName: {
    type: String,
    minLength: [2, "Company name must have at least 2 characters"],
    maxLength: [60, "Company name must have at most 60 characters"],
    trim: true,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
    default: "remote",
  },
  salary: {
    type: String,
  },
  technologies: {
    type: [String],
    required: [true, "Company owner must enter required technologies"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  jobExpiresAt: {
    type: Date,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User must be provided"],
  },
  companyLogo: {
    type: String,
    default: "",
  },
  aboutUs: {
    type: String,
    maxLength: [
      1200,
      "You must have at most 1200 characters at Company description",
    ],
    trim: true,
  },
  jobDescription: {
    type: String,
    maxLength: [
      1200,
      "You must have at most 1200 characters at job description",
    ],
  },
  responsibilities: {
    type: [String],
  },
  requiredQualifications: {
    type: [String],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  numberOfLikes: {
    type: Number,
    default: 0,
    value: function () {
      return this.likes.length;
    },
  },
});

export default mongoose.model("Job", jobSchema);
