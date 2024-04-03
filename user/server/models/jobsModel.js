import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    name: { type: Schema.Types.ObjectId, ref: "Companies" },
    jobTitle: { type: String, required: [true, "Job Title is required"] },
    jobType: { type: String, required: [true, "Job Type is required"] },
    location: { type: String, required: [true, "Location is required"] },
    jobLocationRegion: { type: String, required: [true, "Job Location Region is required"] },
    jobLocationProvince: { type: String, required: [true, "Job Location Province is required"] },
    jobLocationCity: { type: String, required: [true, "Job Location City is required"] },
    salary: { type: Number, required: [true, "Salary is required"] },
    salaryPeriod: { type: String, required: [true, "Salary Period is required"]},
    vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    startHiringDate: { type: Date },
    endHiringDate: { type: Date },
    isArchived: { type: Boolean }
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;