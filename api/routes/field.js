const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const Fields = require("../models/fields");
const Users = require("../models/users");

router.post("/", async (req, res) => {
  const {
    name,
    length,
    width,
    resource,
    resource_type,
    lat,
    long,
    altitude,
    user_id,
  } = req.body;

  if (
    !name ||
    !length ||
    !width ||
    !resource ||
    !resource_type ||
    !lat ||
    !long ||
    !altitude
  ) {
    return res.status(400).json("missing parameters");
  }

  if (user_id && !isValidObjectId(user_id)) {
    return res.status(400).json("user id is not valid");
  }

  try {
    let user = null;

    if (user_id) {
      user = await Users.findOne({ _id: user_id });

      if (!user) {
        return res.status(400).json("user not found");
      }
    }

    const field = await Fields.create({
      name: name,
      length: length,
      width: width,
      resource: resource,
      resource_type: resource_type,
      lat: lat,
      long: long,
      altitude: altitude,
      user: user,
    });

    return res.status(201).json(field);
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occured");
  }
});

router.get("/", async (req, res) => {
  try {
    const fields = await Fields.find({});

    return res.status(200).json(fields);
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json("id is not valid");
  }

  try {
    const field = await Fields.findOne({ _id: id });

    if (!field) {
      return res.status(400).json("field not found");
    }

    return res.status(200).json(field);
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newField = req.body;

  if (!newField) {
    return res.status(400).json("nothing to modify");
  }

  if (!isValidObjectId(id)) {
    return res.status(400).json("id is not valid");
  }

  if (newField.user_id && !isValidObjectId(newField.user_id)) {
    return res.status(400).json("user id is not valid");
  }

  try {
    let user = null;

    if (newField.user_id) {
      user = await Users.findOne({ _id: newField.user_id });

      if (!user) {
        return res.status(400).json("user not found");
      }
      newField.user = user;
    }

    const field = await Fields.findOne({ _id: id });

    if (!field) {
      return res.status(400).json("field not found");
    }

    const updatedField = await Fields.findOneAndUpdate(
      { _id: id },
      {
        ...newField,
      },
      { new: true }
    );

    return res.status(200).json(updatedField);
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  if (!isValidObjectId(id)) {
    return res.status(400).json("id is not valid");
  }

  try {
    const field = await Fields.findOne({ _id: id });

    if (!field) {
      return res.status(400).json("field not found");
    }

    await Fields.deleteOne(field);

    return res.status(200).json("field " + field.id + " delted");
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

module.exports = router;
