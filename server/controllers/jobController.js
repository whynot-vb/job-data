import Job from "../models/jobModel.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError,
} from "../errors.js";

export const createJob = async (req, res) => {
  let {
    jobName,
    companyName,
    jobLocation,
    salary,
    companyLogo,
    technologies,
    jobExpiresAt,
    aboutUs,
    jobDescription,
    responsibilities,
    requiredQualifications,
  } = req.body;

  if (
    !jobName ||
    !companyName ||
    !technologies ||
    !jobExpiresAt ||
    !aboutUs ||
    !jobDescription ||
    !responsibilities ||
    !requiredQualifications
  ) {
    throw new BadRequestError("Please provide all the required fields");
  }

  req.body.creator = req.user.userId;

  const job = await Job.create(req.body);
  res.status(201).json({ job });
};
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const {
    jobName,
    companyName,
    jobLocation,
    salary,
    companyLogo,
    technologies,
    jobExpiresAt,
    aboutUs,
    jobDescription,
    responsibilities,
    requiredQualifications,
  } = req.body;

  if (
    !jobName ||
    !companyName ||
    !technologies ||
    !jobExpiresAt ||
    !aboutUs ||
    !jobDescription ||
    !responsibilities ||
    !requiredQualifications
  ) {
    throw new BadRequestError("Please provide all the required values");
  }

  const job = await Job.findOne({ _id: id });

  if (!job) {
    throw new NotFoundError(`No job with ID: ${id} was found`);
  }

  if (req.user.userId !== job.creator.toString()) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }

  const updatedJob = await Job.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ updatedJob });
};
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const jobToDelete = await Job.findOne({ _id: id });

  if (!jobToDelete) {
    throw new NotFoundError(`Job with ID: ${id} not found`);
  }

  if (req.user.userId !== jobToDelete.creator.toString()) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }

  await jobToDelete.remove();
  res.status(200).json({ msg: "Job deleted successfully" });
};

export const getOneJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id });
  if (!job) {
    throw new NotFoundError(`Job with ID: ${id} not found`);
  }

  res.status(200).json({ job });
};

export const likeJob = async (req, res) => {
  const { id } = req.params;

  if (!req.user.userId) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }

  const job = await Job.findOne({ _id: id });
  if (!job) {
    throw new NotFoundError(`No job with ID: ${id} was found`);
  }

  const index = job.likes.findIndex(
    (userId) => String(userId) === String(req.user.userId)
  );

  if (index === -1) {
    job.likes.push(req.user.userId);
  } else {
    job.likes = job.likes.filter(
      (userId) => String(userId) !== String(req.user.userId)
    );
  }

  const updatedJob = await Job.findByIdAndUpdate({ _id: id }, job, {
    new: true,
  });

  res.status(200).json({ updatedJob });
};

export const getAllJobs = async (req, res) => {
  const { jobName, companyName, jobLocation, technologies, sort } = req.query;

  let queryObject = {};

  if (jobName) {
    queryObject.jobName = { $regex: jobName, $options: "i" };
  }

  if (jobLocation) {
    queryObject.jobLocation = { $regex: jobLocation, $options: "i" };
  }

  if (companyName) {
    queryObject.companyName = { $regex: companyName, $options: "i" };
  }

  if (technologies) {
    queryObject.technologies = {
      $regex: technologies.toString(),
      $options: "i",
    };
  }
  let jobs = Job.find(queryObject);

  jobs = Job.aggregate([
    {
      $match: queryObject,
    },
    { $addFields: { likeCounter: { $size: "$likes" } } },
    { $sort: { likeCounter: -1 } },
  ]);

  if (sort === "expiresFirst") {
    jobs = jobs.sort("jobExpiresAt");
  }

  if (sort === "expiresLast") {
    jobs = jobs.sort("-jobExpiresAt");
  }

  if (sort === "a-z") {
    jobs = jobs.sort("jobName");
  }

  if (sort === "z-a") {
    jobs = jobs.sort("-jobName");
  }

  if (sort === "likes") {
    jobs = jobs.sort("-likeCounter");
  }

  if (sort === "dislikes") {
    jobs = jobs.sort("likeCounter");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  jobs = jobs.skip(skip).limit(limit);

  const results = await jobs;

  const numberOfResults = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(numberOfResults / limit);

  res.status(200).json({ results, numberOfResults, numberOfPages });
};
