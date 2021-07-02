const express = require("express");
const router = express.Router();

const userRoute = require("./routes/user");
const fieldRoute = require("./routes/field");
const imageRoute = require("./routes/image");
const imagePocessRoute = require("./routes/image_process");

router.use(userRoute);
router.use("/fields", fieldRoute);
router.use("/images", imageRoute);
router.use("/images_process", imagePocessRoute);

module.exports = router;
