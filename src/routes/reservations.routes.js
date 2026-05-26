const express = require("express");
const router = express.Router();

const id = require("../middlewares/id");
const asyncHandler = require("../utils/asyncHandler"); 

const reservationsController = require("../controllers/reservations.controller");


router.get("/", asyncHandler(reservationsController.getAll));

router.get("/:id", [id], asyncHandler(reservationsController.getOne));

router.post("/", asyncHandler(reservationsController.add));

router.put("/:id", [id], asyncHandler(reservationsController.update));

router.patch("/:id/cancel", [id], asyncHandler(reservationsController.cancelReservation));

router.delete("/:id", [id], asyncHandler(reservationsController.remove));

module.exports = router;