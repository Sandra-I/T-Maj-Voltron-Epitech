const express = require("express");
const mongoose = require("./database/index");
const router = require("./router");


const app = express();


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())

app.use("/api", router);

app.listen(5000, () => {
  console.log("Server has started!");
});
