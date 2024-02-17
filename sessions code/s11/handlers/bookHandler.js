const DATA_PATH = "data/books.json";

const fs = require("fs").promises;

exports.getAllBooks = async (req, res, next) => {
  // console.log(req.author);
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    const books = JSON.parse(data);

    res.json({
      message: "success",
      data: books,
    });
  } catch (err) {
    // console.log(err)
    res.json({
      message: "Internal server Error",
      // error: err.message,
    });
  }
};

exports.getBook = async (req, res) => {
  // param --> req
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    const books = JSON.parse(data);

    const book = books.find((b) => b.id === req.params.id);

    if (!book) {
      return res.status(404).json({
        message: `No book with that id ${req.params.id}`,
      });
    }

    res.status(201).json({
      message: "success",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.createBook = async (req, res) => {
  // body --> req
  try {
    const id = req.body.id;
    const title = req.body.title;
    const price = req.body.price;

    const data = await fs.readFile(DATA_PATH, "utf8");
    const books = JSON.parse(data);

    books.push({ id, title, price });

    await fs.writeFile(DATA_PATH, JSON.stringify(books));

    res.status(201).json({
      message: "Book created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await fs.readFile("data/books.json", "utf8");
    const books = JSON.parse(data);

    const newBooks = books.filter((book) => book.id !== id);

    await fs.writeFile("data/books.json", JSON.stringify(newBooks));

    res.status(204).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    const newBook = req.body;

    const data = await fs.readFile("data/books.json", "utf8");
    const books = JSON.parse(data);

    const ind = books.findIndex((book) => book.id === id);

    if (ind === -1) {
      return res.status(404).json({
        message: "No book with that id",
      });
    }

    for (let i = 0; i < books.length; i++) {
      if (books[i].id === id) {
        books[i] = newBook;
      }
    }

    await fs.writeFile("data/books.json", JSON.stringify(books));

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      error: err.message,
    });
  }
};

exports.checkBody = (req, res, next) => {
  if (!req.body.title || !req.body.price) {
    return res.status(400).json({
      message: "title and price are required",
    });
  }

  next();
};

exports.logID = (req, res, next, val) => {
  console.log(`Book id is: ${val}`);

  next();
};

// module.exports = {
//   getAllBooks,
//   getBook
// }
