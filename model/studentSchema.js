const mongoose = require("mongoose");

const stdSchema = mongoose.Schema({
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
  fav: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Teacher",
  },
});

module.exports = mongoose.model("Student", stdSchema);
