const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.post("/create-user", userController.createUser);

export default router;
