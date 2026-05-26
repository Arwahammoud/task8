const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const id = require("../middlewares/id");

const loansController = require("../controllers/loans.controller");

router.get("/", asyncHandler(loansController.getAll));
router.get("/:id", [id], asyncHandler(loansController.getOne));
router.post("/", asyncHandler(loansController.add));
router.put("/:id", [id], asyncHandler(loansController.update));
router.patch("/:id/return", [id], asyncHandler(loansController.returnMaterial));
router.delete("/:id", [id], asyncHandler(loansController.remove));

module.exports = router;