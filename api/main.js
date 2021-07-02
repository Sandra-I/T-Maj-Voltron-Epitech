const express = require("express");
const mongoose = require("./database/index");
var morgan = require("morgan");
const router = require("./router");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

app.use(morgan("tiny"));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server has started!");
});
