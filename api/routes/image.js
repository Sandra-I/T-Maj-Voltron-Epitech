const express = require("express");
const router = express.Router();
const { isValidObjectId } = require("mongoose");

const Fields = require("../models/fields");
const Images = require("../models/images");

router.post("/", async (req, res) => {
  const { name, field_id } = req.body;

  if (!name || !field_id) {
    return res.status(400).json("missing parameters");
  }

  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json("file not found");
    }
    if (!isValidObjectId(field_id)) {
      return res.status(400).json("filed_id is not valid");
    }

    const base64image = req.files.file.data.toString("base64");
    const field = await Fields.findOne({ _id: field_id });

    if (!field) return res.status(400).json("field not found");

    const image = await Images.create({
      base_64: base64image,
      name: name,
      field: field,
    });

    return res.status(201).json(image);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/", async (req, res) => {
  try {
    const images = await Images.find();

    return res.status(200).json(images);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/lasted", async (req, res) => {
  try {
    const image = await Images.findOne({}, {}, { sort: { createdAt: -1 } });

    if (!image) return res.status(400).json("not image found");

    return res.status(200).json(image);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    if (!isValidObjectId(id)) return res.status(400).json("invalid id");

    const image = await Images.findOne({ _id: id });

    if (!image) return res.status(400).json("image not found");

    return res.status(200).json(image);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

module.exports = router;
