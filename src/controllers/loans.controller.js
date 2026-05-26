const Loan = require("../models/Loans");
const Material = require("../models/Materials");

class LoansController {
    getAll = async (req, res) => {
        const data = await Loan.find().populate("memberId").populate("materialId");
        res.status(200).json({ data });
    }

    getOne = async (req, res) => {
        const data = await Loan.findById(req.params.id).populate("memberId").populate("materialId");
        if (!data) return res.status(404).json("Loan Not Found");
        res.status(200).json({ data });
    }

    add = async (req, res) => {
        const { memberId, librarianId, materialId, dueDate } = req.body;

        const material = await Material.findById(materialId);
        if (!material || material.availableCopies <= 0) {
            return res.status(400).json(" this Material is not available to loan ");
        }

        const data = await Loan.create({ memberId, librarianId, materialId, dueDate });

        material.availableCopies -= 1;
        await material.save();

        res.status(201).json({ data });
    }

    update = async (req, res) => {
        const data = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).json("Loan Not Found");
        res.status(200).json({ data });
    }

    returnMaterial = async (req, res) => {
        const loan = await Loan.findById(req.params.id);
        if (!loan) return res.status(404).json("Loan Not Found");

        loan.actualReturnDate = Date.now();
        loan.status = "returned";

        if (loan.actualReturnDate > loan.dueDate) {
            const diffDays = Math.ceil((loan.actualReturnDate - loan.dueDate) / (1000 * 60 * 60 * 24));
            loan.fine.totalFine = diffDays * loan.fine.finePerDay;
        }

        await loan.save();

        await Material.findByIdAndUpdate(loan.materialId, { $inc: { availableCopies: 1 } });

        res.status(200).json({ data: loan });
    }

    remove = async (req, res) => {
        const data = await Loan.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json("Loan Not Found");
        res.status(200).json({ message: "the loan is deleted" });
    }
}

module.exports = new LoansController();