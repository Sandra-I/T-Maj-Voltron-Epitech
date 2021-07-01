const mongoose = require("../database/index");

const schema = mongoose.Schema(
  {
    firstname: { type: "string", required: true },
    lastname: { type: "string", required: true },
    login: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", schema);
