const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

const bookRouter = require("./routes/bookRouter");
const userRouter = require("./routes/userRouter");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Connected to the DB"));

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);

const port = process.env.PORT || 4444;
app.listen(port, "localhost", () => {
  console.log(`App listening on port ${port}`);
});
