const Job = require("../models/Job");


// ================= CREATE JOB =================

const createJob = async (req, res) => {
    try {
        // Only employers can create jobs
        if (req.user.role !== "EMPLOYER") {
            return res.status(403).json({
                message: "Only employers can create jobs"
            });
        }

        const {
            title,
            company,
            description,
            location,
            salary,
            skills
        } = req.body;

        if (!title || !company || !description || !location) {
            return res.status(400).json({
                message: "Title, company, description and location are required"
            });
        }

        const job = await Job.create({
            title,
            company,
            description,
            location,
            salary,
            skills,
            postedBy: req.user.userId
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= GET ALL JOBS =================

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate("postedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: jobs.length,
            jobs
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= GET SINGLE JOB =================

const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("postedBy", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= UPDATE JOB =================

const updateJob = async (req, res) => {
    try {
        if (req.user.role !== "EMPLOYER") {
            return res.status(403).json({
                message: "Only employers can update jobs"
            });
        }

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Only the employer who created the job can update it
        if (job.postedBy.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "You can only update your own jobs"
            });
        }

        const {
            title,
            company,
            description,
            location,
            salary,
            skills
        } = req.body;

        job.title = title ?? job.title;
        job.company = company ?? job.company;
        job.description = description ?? job.description;
        job.location = location ?? job.location;
        job.salary = salary ?? job.salary;
        job.skills = skills ?? job.skills;

        await job.save();

        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ================= DELETE JOB =================

const deleteJob = async (req, res) => {
    try {
        if (req.user.role !== "EMPLOYER") {
            return res.status(403).json({
                message: "Only employers can delete jobs"
            });
        }

        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Only the employer who created the job can delete it
        if (job.postedBy.toString() !== req.user.userId.toString()) {
            return res.status(403).json({
                message: "You can only delete your own jobs"
            });
        }

        await Job.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
};
