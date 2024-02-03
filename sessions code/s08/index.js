/*
// const geoModule = require("./geo");
const { circleArea, rectArea, MY_CONST } = require("./geo");

console.log(`circle Area = ${circleArea(3)}`);
console.log(`rectangele Area = ${rectArea(3)}`);

// custom module, core module, external modules
*/
/*
const express = require("express");
const app = express();

// /book --> 'مفيض كتب دلوقتي
app.get("/book", (request, response) => {
  // response.send("مفيض كتب دلوقتي");
  response.json({
    message: "no books here!",
  });
});

app.listen(4444, () => {
app.listen(4444, 'localhost', () => {
  console.log("App listening on port 4444");
});
*/

// bookstore --> get all books, get book, delete book, create book
const fs = require("fs").promises;
const express = require("express");
const app = express();

// Middleware to parse json body (POST)
app.use(express.json());

const DATA_PATH = "data/books.json";

// GET /books
app.get("/books", async (req, res) => {
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
});

// GET /books/:id
app.get("/books/:id", async (req, res) => {
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
});

// POST /books
app.post("/books", async (req, res) => {
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
});

// update ---> PATCH
// app.patch()

// delete ---> DELETE

app.listen(4444, "localhost", () => {
  console.log("App listening on port 4444");
});
