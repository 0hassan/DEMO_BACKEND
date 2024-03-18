const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const otpModal = mongoose.model("otp", otpSchema);
module.exports = otpModal;
