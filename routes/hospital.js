const express = require("express");
const Hospital = require("../controllers/hospital");

const router = express.Router();

router.post("/register", Hospital.registeruser);
router.post("/login", Hospital.loginUser);

module.exports = router;
