const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: String,

     
    totalCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    availableCopies: {
      type: Number,
      required: true,
      min: 0,
    },

    coverImage: String,
    

    materialType: {
      type: String,
      enum: ["book", "magazine", "cd", "map"],
      required: true,
      lowercase: true,
      
    },

    book: {
      author: String,
      publisher: String,
      publishedYear: Number,
      isbn: {
        type: String,
        unique: true,
      },
    },

    magazine: {
      issueNumber: String,
      month: String,
      year: Number,
    },
  },
  { timestamps: true }
);
/* 
materialSchema.methods.isAvailable = function () {
  return this.availableCopies > 0;
}; */

module.exports = mongoose.model("Material", materialSchema);