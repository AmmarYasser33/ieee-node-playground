const mongoose = require("mongoose");
const slugify = require("slugify");

const books = require("../data/booksData");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book must have a title"],
      unique: true,
      validate: {
        validator: function (val) {
          return !val.includes("-");
        },
        message: "Title must not contain (-)",
      },
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
    copies: {
      type: Number,
      default: 1,
    },
    author: String,
    cover: String,
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Proprieties
bookSchema.virtual("fullTitle").get(function () {
  return `${this.title} by ${this.author}`;
});

bookSchema.virtual("published").get(function () {
  return this.createdAt.getFullYear();
});

// Doc Middleware: .save() & .create()
bookSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });

  next();
});

// Query Middleware
bookSchema.pre(/^find/, function (next) {
  // console.log("pre findOne...");

  this.find({ copies: { $gt: 0 } });

  next();
});

const Book = mongoose.model("Book", bookSchema);

// Book.findOne({ _id: "65f83b112e3b99b4a63072bc" }).then((book) => {
//   console.log(book.fullTitle);
//   console.log(book.published);
// });

// Book.create(books).then((books) => console.log(`${books.length} books Added`));

module.exports = Book;
