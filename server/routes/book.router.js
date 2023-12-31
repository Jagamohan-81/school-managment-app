const express = require("express");
const router = express.Router();
const { getAllBooks } = require("../controllers/bookController");
const {
  validateDB,
  validateStudentExistanceInDB,
} = require("../helpers/userDbValidate");
const {
  userAuthenticateMiddleware,
} = require("../helpers/authenticateMiddleware");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to Student route" });
});

router.get("/get-list", getAllBooks);

module.exports = router;
