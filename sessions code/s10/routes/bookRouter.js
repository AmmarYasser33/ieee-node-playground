const express = require("express");
const router = express.Router();

const bookHandler = require("../handlers/bookHandler");

// router.param("id", (req, res, next, val) => {
//   console.log(`Book id is: ${val}`);

//   next();
// });

router.param(bookHandler.logID);

// router.use(bookHandler.checkBody);

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
