const mongoose = require("mongoose");

var loginSchema = new mongoose.Schema(
  {
    username: { type: String, required: true ,unique:true},
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin_login", loginSchema );