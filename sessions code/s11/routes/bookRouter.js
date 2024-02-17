const express = require("express");
const router = express.Router();

const bookHandler = require("../handlers/bookHandler");

router.param("id", bookHandler.logID);

router
  .route("/")
  .get(bookHandler.getAllBooks)
  .post(bookHandler.checkBody, bookHandler.createBook);

router
  .route("/:id")
  .get(bookHandler.getBook)
  .delete(bookHandler.deleteBook)
  .patch(bookHandler.checkBody, bookHandler.updateBook);

module.exports = router;
