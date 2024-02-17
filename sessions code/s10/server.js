// bookstore --> get all books, get book, delete book, create book

const express = require("express");
const morgan = require("morgan");

const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");

const app = express(); // main Router

// Middleware to parse json body (POST)
app.use(express.json());
app.use(morgan("dev"));

/*
app.use((req, res, next) => {
  console.log("Middleware Yaaaahh!");

  next();
});

app.use((req, res, next) => {
  req.author = "Ammar";

  next();
});
*/

app.use("/api/books", bookRouter); // mount the router
app.use("/api/users", userRouter);

app.listen(4444, "localhost", () => {
  console.log("App listening on port 4444");
});
