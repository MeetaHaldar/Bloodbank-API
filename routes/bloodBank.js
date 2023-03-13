const express = require("express");
const bloodBank = require("../controllers/bloodBank");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

router.use(verifyToken);
router.post("/", bloodBank.addBloodSample);
router.delete("/:id", bloodBank.deleteBloodSample);
router.put("/:id", bloodBank.updateBloodSample);
module.exports = router;
