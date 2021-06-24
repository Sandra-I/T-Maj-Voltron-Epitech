const mongoose = require("../database/index");

const schema = mongoose.Schema(
  {
    base64Image: { type: String, required: true },
    accepted: { type: Boolean, required: true },
    probability: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ia", schema);
