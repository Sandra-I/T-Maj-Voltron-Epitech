const express = require("express");
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
    await Users.create({
      login: login,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });

    return res.status(201).json("Utilisateur crée");
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
    const connectedUser = await Users.findOne({ login: login });

    if (!connectedUser) {
      return res.status(400).json("User not found");
    }

    return res.status(200).json("connected");
  } catch ($e) {
    console.log($e);
    res.status(400).json("an error has occurred");
  }
});

module.exports = router;
