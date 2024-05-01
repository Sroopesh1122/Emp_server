const mongoose = require("mongoose");

var employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true ,unique:true},
    mobile: { type: Number, required: true ,unique:true},
    designation: { type: String, enum: ["hr", "manager", "sales"] },
    course: [{ type: String, enum: ["mca", "bca", "bsc"] }],
    profile: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee_list", employeeSchema);
