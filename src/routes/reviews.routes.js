const express = require("express");
const router = express.Router();


const id = require("../middlewares/id");
const asyncHandler = require("../utils/asyncHandler");

const reviewsController = require("../controllers/reviews.controller");


router.get("/", asyncHandler(reviewsController.getAll));

router.get("/:id", [id], asyncHandler(reviewsController.getOne));

router.post("/" ,asyncHandler(reviewsController.add));

router.put("/:id",[id], asyncHandler(reviewsController.update));

router.delete("/:id",[id],asyncHandler(reviewsController.remove));

module.exports = router;