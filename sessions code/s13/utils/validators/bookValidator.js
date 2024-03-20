const { check } = require("express-validator");
const validatorError = require("../validationError");

exports.createBookValidator = [
  check("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long")
    .custom((value) => {
      if (value.includes("-")) {
        throw new Error("Title should not contain (-)");
      }

      return true;
    }),

  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  check("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("author").optional().isString().withMessage("Author must be a string"),

  check("cover").optional().isString().withMessage("Cover must be a string"),

  check("copies")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Copies must be a positive number"),

  validatorError,
];

exports.getBookValidator = [
  check("id").isMongoId().withMessage("ID is invalid"),

  validatorError,
];

exports.deleteBookValidator = [
  check("id").isMongoId().withMessage("ID is invalid"),

  validatorError,
];

exports.updateBookValidator = [
  check("id").isMongoId().withMessage("ID is invalid"),

  check("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 2 })
    .withMessage("Title must be at least 2 characters long")
    .custom((value) => {
      if (value.includes("-")) {
        throw new Error("Title should not contain (-)");
      }

      return true;
    }),

  check("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  check("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  check("author").optional().isString().withMessage("Author must be a string"),

  check("cover").optional().isString().withMessage("Cover must be a string"),

  check("copies")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Copies must be a positive number"),

  validatorError,
];
