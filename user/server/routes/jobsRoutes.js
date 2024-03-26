import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
  applyJob,
  allJobs,
  editJob
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, createJob);

// UPDATE JOB
router.put("/update-job/:jobId", userAuth, updateJob);

router.put("/edit-job/:jobId", userAuth, editJob);

router.put("/apply-job/:jobId", userAuth, applyJob);

// GET JOB POST
router.get("/find-jobs", getJobPosts);

router.get("/alljobs", allJobs);

router.get("/job-available", getJobPosts);

router.get("/get-job-detail/:id", getJobById);

router.get("/job-available", getJobPosts);

router.post("/create-job", userAuth, createJob);

// DELETE JOB POST
router.delete("/delete-job/:id", deleteJobPost);

export default router;
