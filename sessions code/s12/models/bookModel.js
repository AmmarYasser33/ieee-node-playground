const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book must have a title"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Book must have a description"],
    },
    price: {
      type: Number,
      required: [true, "Book must have a price"],
      min: [0, "Price must be positive"],
    },
    author: String,
    cover: String,
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
