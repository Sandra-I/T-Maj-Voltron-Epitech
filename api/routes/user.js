const express = require("express");
const { isValidObjectId } = require("mongoose");
const Fields = require("../models/fields");
const Report_datas = require("../models/report_datas");
const router = express.Router();
const Users = require("../models/users");

router.post("/register", async (req, res) => {
  const { login, password, firstname, lastname } = req.body;

  if (!login || !password || !firstname || !lastname) {
    return res.status(400).json("missing parameters");
  }

  const user = await Users.findOne({ login: login });

  if (user) {
    return res.status(400).json("login already exist !");
  }

  try {
    const userCreate = await Users.create({
      login: login,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });

    return res.status(201).json(userCreate);
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json("missing parameters");
  }

  try {
    const connectedUser = await Users.findOne(
      { login: login },
      { password: 0 }
    );

    if (!connectedUser) {
      return res.status(400).json("User not found");
    }

    return res.status(200).json(connectedUser);
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

router.get("/users/:id", async (req, res) => {
  const user_id = req.params.id;

  try {
    if (!isValidObjectId(user_id)) {
      return res.status(400).json("invalid user id");
    }

    const user = await Users.findOne(
      {
        _id: user_id,
      },
      { password: 0 }
    );

    if (!user_id) {
      return res.status(400).json("user not found");
    }

    const userFields = await Fields.find({ user: user });

    return res.status(200).json({ user: user, fields: userFields });
  } catch ($e) {
    console.log($e);
    return res.status(400).json("an error has occurred");
  }
});

module.exports = router;
