import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  getJobApplications,
  updateJob,
  applyJob,
  allJobs,
  editJob,
  saveJob,
  removeJob,
  getSavedJobs,
  withdrawApplication,
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, createJob);

// UPDATE JOB
router.put("/update-job/:jobId", userAuth, updateJob);

router.put("/edit-job/:jobId", editJob);

router.put("/apply-job/:jobId", userAuth, applyJob);

// GET JOB POST
router.get("/find-jobs", getJobPosts);

router.get("/alljobs", allJobs);

router.get("/job-available", getJobPosts);

router.get("/job-applications/:userId", getJobApplications);

router.get("/get-job-detail/:id", getJobById);

router.post("/create-job", userAuth, createJob);

router.delete('/:jobId/withdraw-application', withdrawApplication);

// DELETE JOB POST
router.delete("/delete-job/:id", deleteJobPost);

// Route to save a job
router.post("/save-job", saveJob);

// Route to remove a saved job
router.delete("/remove-job", removeJob);

// Route to get all saved jobs
router.get("/saved-jobs/:userId", getSavedJobs);

export default router;
