const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.post("/create-user", userController.createUser);

module.exports = router;
