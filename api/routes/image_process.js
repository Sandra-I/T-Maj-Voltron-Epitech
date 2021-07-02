const express = require("express");
const { isValidObjectId } = require("mongoose");

const Images = require("../models/images");
const Images_process = require("../models/images_process");
const router = express.Router();

router.post("/", async (req, res) => {
  const { status, image_id } = req.body;

  if (!status || !image_id) {
    return res.status(400).json("missing parameters");
  }

  try {
    if (!isValidObjectId(image_id)) {
      return res.status(400).json("image_id is not valid");
    }

    const image = await Images.findOne({ _id: image_id });

    if (!image) return res.status(400).json("image not found");

    const image_process = await Images_process.create({
      status: status,
      image: image,
    });

    return res.status(201).json(image_process);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/lasted", async (req, res) => {
  try {
    const image_process = await Images_process.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    ).populate('image');

    if (!image_process) return res.status(400).json("not image process found");

    return res.status(200).json(image_process);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/", async (req, res) => {
  try {
    const images_process = await Images_process.find();

    return res.status(200).json(images_process);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

module.exports = router;
