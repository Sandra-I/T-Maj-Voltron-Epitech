const express = require("express");
const mongoose = require('./database/index');

const app = express();

app.listen(5000, () => {
  console.log("Server has started!");
});