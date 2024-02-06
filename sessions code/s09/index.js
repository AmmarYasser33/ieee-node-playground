// bookstore --> get all books, get book, delete book, create book
const fs = require("fs").promises;
const express = require("express");
const app = express();

// Middleware to parse json body (POST)
app.use(express.json());

const DATA_PATH = "data/books.json";

const getAllBooks = async (req, res) => {
  try {
    const data = await fs.readFile(DATA_PATH, "utf8");
    const books = JSON.parse(data);

    res.json({
      message: "success",
      data: books,
    });
  } catch (err) {
    res.json({
      message: "Internal server Error",
    });
  }
};

const getBook = async (req, res) => {
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

const createBook = async (req, res) => {
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

const deleteBook = async (req, res) => {
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

const updateBook = async (req, res) => {
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

// app.get("/api/books", getAllBooks);
// app.get("/api/books/:id", getBook);
// app.post("/api/books", createBook);
// app.delete("/api/books/:id", deleteBook);

app.route("/api/books").get(getAllBooks).post(createBook);
app.route("/api/books/:id").get(getBook).delete(deleteBook).patch(updateBook);

app.listen(4444, "localhost", () => {
  console.log("App listening on port 4444");
});
