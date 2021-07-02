const mongoose = require("../database/index");

const schema = mongoose.Schema(
  {
    status: { type: "number", required: true },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "images",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images_process", schema);
