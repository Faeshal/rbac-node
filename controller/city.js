require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const { models } = require("../model");
const City = models.city;

// * @route GET /api/cities
// @desc    Get All cities
// @access  Private
exports.getCities = asyncHandler(async (req, res, next) => {
  const data = await City.findAll({ raw: true });
  res.status(200).json({
    success: true,
    totalData: data.length,
    data,
  });
});

// * @route POST  /api/cities
// @desc    Create New cities
// @access  Private
exports.createCity = asyncHandler(async (req, res, next) => {
  console.log("body:", req.body);
  await City.create(req.body);
  res.status(201).json({ success: true, message: "created" });
});
