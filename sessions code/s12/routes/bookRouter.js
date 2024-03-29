const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");

router
  .route("/")
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route("/:id")
  .get(bookController.getBook)
  .delete(bookController.deleteBook)
  .patch(bookController.updateBook);

module.exports = router;
