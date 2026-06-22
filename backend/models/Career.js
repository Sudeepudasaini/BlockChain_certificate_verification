const mongoose = require("mongoose");
const { Schema } = mongoose;

const careerSchema = new Schema(
  {
    title: { type: String, required: true },
    subjects: [{ type: String }],
    skills: [{ type: String }],
    level: { type: String, enum: ["entry", "mid", "senior"], default: "entry" },
    description: { type: String },
    certifications: [{ type: String }],
    salaryRange: { type: String },
    jobRoles: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Career", careerSchema);
