const mongoose = require("../database/index");

const schema = mongoose.Schema(
  {
    name: { type: "string", required: true },
    length: { type: "number", required: true },
    width: { type: "number", required: true },
    resource: { type: "string", required: true },
    resource_type: { type: "string", required: true },
    lat: { type: "number", required: true },
    long: { type: "number", required: true },
    altitude: {type: "number", required: true},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fields", schema);
