const express = require("express");
const Ia = require("./models/ia");
const router = express.Router();

router.post("/post", async (req, res) => {
  const { image, status, probability } = req.body;

  try {
    const ia = new Ia({
      base64Image: image,
      accepted: status,
      probability: probability,
    });

    await ia.save();

    return res.status(201).json("données enregsitrer avec succée");
  } catch ($e) {
    console.log($e);
    res.status(400).json("une érreur est surveneu");
  }
});

module.exports = router;
