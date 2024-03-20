const Book = require("../models/bookModel");
const ApiFeatures = require("../utils/apiFeatures");

// gt, gte, lt, lte
// { author: 'Author 1', price: { lt: '200' } }
// { author: "Author 2", price: { $lt: 200 } });

// const books = await Book.find().where("author").equals("Author 2");
exports.getAllBooks = async (req, res, next) => {
  try {
    const features = new ApiFeatures(Book.find(), req.query);
    features.filter().sort().limitFields().paginate();

    const books = await features.query;

    res.status(200).json({
      status: "success",
      count: books.length,
      data: {
        books,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "error",
      error: err,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: { book },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      error: err,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    // const newBook = new Book({})
    // newBook.save()

    const book = await Book.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      error: err,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        book,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      error: err,
    });
  }
};
