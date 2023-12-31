const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userUpdate,
  userDetails,
} = require("../controllers/userController");
const { validateBody, schemas } = require("../helpers/bodyValidate");
const {
  validateDB,
  validateUserExistanceInDB,
} = require("../helpers/userDbValidate");
const {
  userAuthenticateMiddleware,
} = require("../helpers/authenticateMiddleware");

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "Welcome to User route" });
});

router.post(
  "/login",
  validateBody(schemas.userLoginSchema),
  validateUserExistanceInDB,
  userLogin
);
router.get("/user-details/:userId", userDetails);
// router.post("/upload/:Id",userAuthenticateMiddleware, userUpdate);

module.exports = router;
