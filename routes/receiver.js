const express = require("express");
const Receiver = require("../controllers/receiver");

const router = express.Router();

router.post("/register", Receiver.registeruser);
router.post("/login", Receiver.loginUser);

module.exports = router;
