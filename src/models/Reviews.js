const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
   
    stars: {
      type: Number,
      required: true,
      min: 1 , 
      max : 5
    },

    comment: String,

    memberId: {
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
  { timestamps: true }
);


module.exports = mongoose.model("Review", reviewSchema);