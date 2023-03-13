const express = require("express");
const Auth = require("../controllers/auth");

const router = express.Router();

router.post("/register", Auth.registeruser);
router.post("/login", Auth.loginUser);

module.exports = router;
