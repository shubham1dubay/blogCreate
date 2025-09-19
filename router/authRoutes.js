const express = require("express");
const { signup, login, logout } = require("../controller/authController");
const auth = require("../middlewares/blogMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
