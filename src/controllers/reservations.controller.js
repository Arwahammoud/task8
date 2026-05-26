const Reservation = require("../models/Reservations");

class ReservationsController {
    getAll = async (req, res) => {
        const data = await Reservation.find()
            .populate("memberId", "name email")
            .populate("materialId", "title");
        res.status(200).json({ data });
    }

    getOne = async (req, res) => {
        const data = await Reservation.findById(req.params.id)
            .populate("memberId").populate("materialId");
        if (!data) return res.status(404).json("Reservation not found");
        res.status(200).json({ data });
    }

    add = async (req, res) => {
        const { memberId, materialId } = req.body;

        // حساب الأولوية: البحث عن أعلى رقم أولوية موجود للمادة وإضافة 1
        const lastReservation = await Reservation.findOne({ materialId })
            .sort({ queuePriority: -1 });
        const newPriority = lastReservation ? lastReservation.queuePriority + 1 : 1;

        const data = await Reservation.create({
            memberId,
            materialId,
            queuePriority: newPriority
        });

        res.status(201).json({ data });
    }

    update = async (req, res) => {
        const data = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).json("Reservation not found");
        res.status(200).json({ data });
    }

    cancelReservation = async (req, res) => {
        const data = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status: "cancelled", cancellationDate: Date.now() },
            { new: true }
        );
        if (!data) return res.status(404).json("Reservation not found");
        res.status(200).json({ message: "the booking is cancelled", data });
    }

    // 5. حذف سجل الحجز
    remove = async (req, res) => {
        const data = await Reservation.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json("Reservation not found");
        res.status(200).json({ message: "deleted" });
    }
}

module.exports = new ReservationsController();