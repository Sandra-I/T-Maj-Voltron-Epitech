const express = require("express");
const { isValidObjectId } = require("mongoose");

const Fields = require("../models/fields");
const Report_datas = require("../models/report_datas");
const router = express.Router();

router.post("/", async (req, res) => {
  const { temperature, humidity, wind_speed, field_id } = req.body;

  if (!temperature || !humidity || !wind_speed || !field_id) {
    return res.status(400).json("missing parameters");
  }

  try {
    if (field_id && !isValidObjectId(field_id)) {
      return res.status(400).json("field_id is not valid");
    }

    const field = await Fields.findOne({ _id: field_id });

    if (!field) return res.status(400).json("field not found");

    const report_datas = await Report_datas.create({
      temperature: temperature,
      humidity: humidity,
      wind_speed: wind_speed,
      field: field,
    });

    return res.status(201).json(report_datas);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/lasted", async (req, res) => {
  try {
    const report_data = await Report_datas.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    ).populate("field");

    if (!report_data) return res.status(400).json("not report data found");

    return res.status(200).json(report_data);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/", async (req, res) => {
  const field_id = req.query.field_id;

  try {
    if (field_id && !isValidObjectId(field_id)) {
      return res.status(400).json("invalid field id");
    }
    let report_datas = null;

    if (field_id) {
      field = await Fields.findOne({ _id: field_id });

      if (!field) {
        return res.status(400).json("field not found");
      }

      report_datas = await Report_datas.find({ field: field });
    } else {
      report_datas = await Report_datas.find();
    }

    return res.status(200).json(report_datas);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

router.get("/:id", async (req, res) => {
  const report_data_id = req.params.id;

  try {
    if (!isValidObjectId(report_data_id)) {
      return res.status(400).json("invalid reprot_data id");
    }

    const report_data = await Report_datas.findOne({
      _id: report_data_id,
    }).populate("field");

    if (!report_data) {
      return res.status(400).json("report data not found");
    }

    return res.status(200).json(report_data);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

module.exports = router;
