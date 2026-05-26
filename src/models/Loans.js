const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema(
  {
    loanDate: {
      type: Date,
      default: Date.now,
      required: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    actualReturnDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ["active", "returned", "overdue", "cancelled"],
      default: "active",
    },

    fine: {
      finePerDay: {
        type: Number,
        default: 500,
       
      },

      totalFine: {
        type: Number,
        default: 0,
       
      },

      fineStatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid",
      },
    },

    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    librarianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
    materialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },

  },
  { timestamps: true },
);

module.exports = mongoose.model("Loan", loanSchema);