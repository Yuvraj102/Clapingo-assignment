const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name not present"],
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "email not present"],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "phone not present"],
  },
  password: {
    type: String,
    required: [true, "password not present"],
  },
  college: {
    type: String,
    required: [true, "college not present"],
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
