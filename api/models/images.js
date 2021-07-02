const mongoose = require("../database/index");

const schema = mongoose.Schema(
  {
    base_64: { type: "string", required: true },
    name: { type: "string", required: true },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fields",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("images", schema);
