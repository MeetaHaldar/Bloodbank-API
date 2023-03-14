const express = require("express");
const request = require("../controllers/request");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);
router.post("/", request.requestBloodSample);

module.exports = router;
