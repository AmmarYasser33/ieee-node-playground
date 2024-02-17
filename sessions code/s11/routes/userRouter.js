const express = require("express");
const router = express.Router();

const userHandler = require("../handlers/userHandler");

router
  .route("/api/users")
  .get(userHandler.getAllUsers)
  .post(userHandler.createUser);
router
  .route("/api/users/:id")
  .get(userHandler.getUser)
  .delete(userHandler.deleteUser)
  .patch(userHandler.updateUser);

module.exports = router;
