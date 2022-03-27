require("pretty-error").start();
const express = require("express");
const router = express.Router();
const cityController = require("../controller/city");

router.get("/api/v1/cities", cityController.getCities);
router.post("/api/v1/cities", cityController.createCity);

module.exports = router;
