const express = require("express");

const {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// Create a job
router.post("/", protect, createJob);


// Get all jobs
router.get("/", getJobs);


// Get one job
router.get("/:id", getJobById);


// Update a job
router.put("/:id", protect, updateJob);


// Delete a job
router.delete("/:id", protect, deleteJob);


module.exports = router;
