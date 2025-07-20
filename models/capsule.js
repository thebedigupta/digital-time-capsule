const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  eventLink: {
    type: String,
    default: "",
  },
  visibleAt: {
    type: Date,
    required: true,
  },
  group: {
    type: String,
    default: "None",
  },
  createdBy: {
    type: String,
    required: true,
  },
  shareId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Capsule", capsuleSchema);
