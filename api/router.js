const express = require("express");
const { isValidObjectId } = require("mongoose");
const Fields = require("./models/fields");
const Images = require("./models/images");
const Images_process = require("./models/images_process");
const Users = require("./models/users");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { login, password, firstname, lastname } = req.body;


  if (!login || !password || !firstname || !lastname) {
    return res.status(400).json("missing parameters");
  }

  try {
    await Users.create({
      login: login,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });

    return res.status(201).json("Utilisateur crée");
  } catch ($e) {
    console.log($e);
    res.status(400).json("Une érreur est surveneu");
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json("missing parameters");
  }

  try {

    const connectedUser = await Users.findOne({login: login});

    if (!connectedUser) {
      return res.status(400).json('User not found');
    }

    return res.status(200).json('connected');

  } catch ($e) {
    console.log($e);
    res.status(400).json("Une érreur est surveneu");
  }
});



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


router.post("/images", async (req, res) => {
  const {  name, field_id } = req.body;

  if (!name || !field_id) {
    return res.status(400).json('missing parameters');
  }

  try {

    if (!req.files || !req.files.file) {
      return res.status(400).json('file not found');
    }
    if (!isValidObjectId(field_id)) {
      return res.status(400).json('filed_id is not valid');
    }


    const base64image = req.files.file.data.toString("base64");
    const field = await Fields.findOne({_id: field_id});

    if (!field)
      return res.status(400).json("field not found");

    Images.create({
      base_64: base64image,
      name: name,
      field: field,
    });


    return res.status(201).json("image save");
  } catch ($e) {
    console.log($e);
    return res.status(400).json("une érreur est surveneu");
  }
});


router.get("/images", async (req, res) => {

  try {

    const images = await Images.find();

    return res.status(200).json(images);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("une érreur est surveneu");
  }
});

router.get("/images/:id", async (req, res) => {
  const id = req.params.id

  try {

    if (!isValidObjectId(id))
      return res.status(400).json('invalid id');

    const image = await Images.findOne({_id: id});

    if (!image)
      return res.status(400).json('image not found');


    return res.status(200).json(image);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("une érreur est surveneu");
  }
});


router.post("/images_process", async (req, res) => {
  const {  status, image_id } = req.body;

  if (!status || !image_id) {
    return res.status(400).json('missing parameters');
  }

  try {

    if (!isValidObjectId(image_id)) {
      return res.status(400).json('image_id is not valid');
    }

    const image = await Images.findOne({_id: image_id});

    if (!image)
      return res.status(400).json("image not found");

    await Images_process.create({
      status: status,
      image: image,
    });


    return res.status(201).json("image process save");
  } catch ($e) {
    console.log($e);
    return res.status(400).json("une érreur est surveneu");
  }
});

router.get("/images_process", async (req, res) => {


  try {

    const images_process = await Images_process.find();

    return res.status(200).json(images_process);
  } catch ($e) {
    console.log($e);
    return res.status(400).json("une érreur est surveneu");
  }
});

module.exports = router;
