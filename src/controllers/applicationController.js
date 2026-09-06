const Application = require("../models/Application");
const Job = require("../models/Job");


// ================= APPLY FOR JOB =================

const applyForJob = async (req, res) => {
    try {
        if (req.user.role !== "JOB_SEEKER") {
            return res.status(403).json({
                message: "Only job seekers can apply for jobs"
            });
        }

        const { coverLetter } = req.body;

        if (!coverLetter) {
            return res.status(400).json({
                message: "Cover letter is required"
            });
        }

        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existingApplication = await Application.findOne({
            job: job._id,
            applicant: req.user.userId
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
            job: job._id,
            applicant: req.user.userId,
            coverLetter
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= MY APPLICATIONS =================

const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            applicant: req.user.userId
        })
            .populate("job")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= EMPLOYER APPLICATIONS =================

const getJobApplications = async (req, res) => {
    try {
        if (req.user.role !== "EMPLOYER") {
            return res.status(403).json({
                message: "Only employers can view applications"
            });
        }

        const job = await Job.findById(req.params.jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.postedBy.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "You can only view applications for your own jobs"
            });
        }

        const applications = await Application.find({
            job: job._id
        })
            .populate("applicant", "name email")
            .populate("job", "title company")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= UPDATE APPLICATION STATUS =================

const updateApplicationStatus = async (req, res) => {
    try {
        if (req.user.role !== "EMPLOYER") {
            return res.status(403).json({
                message: "Only employers can update application status"
            });
        }

        const { status } = req.body;

        const allowedStatuses = [
            "PENDING",
            "SHORTLISTED",
            "REJECTED",
            "ACCEPTED"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }

        const application = await Application.findById(
            req.params.applicationId
        ).populate("job");

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        if (
            application.job.postedBy.toString() !==
            req.user.userId.toString()
        ) {
            return res.status(403).json({
                message: "You cannot update this application"
            });
        }

        application.status = status;

        await application.save();

        res.status(200).json({
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    applyForJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
};
