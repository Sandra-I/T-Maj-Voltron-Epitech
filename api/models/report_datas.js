const mongoose = require("../database/index");

const schema = mongoose.Schema(
  {
    temperature: { type: "number", required: true },
    humidity: { type: "number", required: true },
    wind_speed: { type: "number", required: true },
    field: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "fields",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fields", schema);
