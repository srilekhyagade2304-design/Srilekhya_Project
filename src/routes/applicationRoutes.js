const express = require("express");

const {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


// Job seeker applies for a job
router.post(
    "/jobs/:jobId",
    protect,
    applyForJob
);


// Job seeker views their applications
router.get(
    "/my",
    protect,
    getMyApplications
);


// Employer views applications for their job
router.get(
    "/jobs/:jobId",
    protect,
    getJobApplications
);


// Employer changes application status
router.put(
    "/:applicationId/status",
    protect,
    updateApplicationStatus
);


module.exports = router;
