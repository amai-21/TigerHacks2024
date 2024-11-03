const express = require("express");
const plantController = require("../Controllers/PlantController");
const router = express.Router();

router.post("/plants", plantController.PostRecommendationController);

export default router;
