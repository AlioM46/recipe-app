const express = require("express");
const register = require("../controllers/register.js");
const login = require("../controllers/login.js");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
