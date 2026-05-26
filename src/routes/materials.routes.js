const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

const materialsController = require("../controllers/materials.controller");


router.get("/", asyncHandler(materialsController.getAll))

router.get("/:id", [id], asyncHandler(materialsController.getOne))     

router.post("/", asyncHandler(materialsController.add))

router.put("/:id", [id], asyncHandler(materialsController.update))

router.delete("/:id", [id], asyncHandler(materialsController.remove))

module.exports = router;