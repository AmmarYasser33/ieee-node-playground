const express = require("express");

const router = express.Router();

const bookController = require("../controllers/bookController");
const bookValidator = require("../utils/validators/bookValidator");

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookValidator.createBookValidator, bookController.createBook);

router
  .route("/:id")
  .get(bookValidator.getBookValidator, bookController.getBook)
  .delete(bookValidator.deleteBookValidator, bookController.deleteBook)
  .patch(bookValidator.updateBookValidator, bookController.updateBook);

module.exports = router;
