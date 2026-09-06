const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["JOB_SEEKER", "EMPLOYER", "ADMIN"],
            default: "JOB_SEEKER"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);