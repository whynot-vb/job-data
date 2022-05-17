import express from "express";

import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  getOneJob,
  likeJob,
} from "../controllers/jobController.js";
import authenticateUser from "../middleware/authenticate.js";
const router = express.Router();

router.route("/").post(authenticateUser, createJob);
router.route("/").get(getAllJobs);
router
  .route("/:id")
  .get(getOneJob)
  .patch(authenticateUser, updateJob)
  .delete(authenticateUser, deleteJob);

router.route("/:id/likeJob").patch(authenticateUser, likeJob);

export default router;
