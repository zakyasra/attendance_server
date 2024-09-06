const express = require("express");
const AttandanceController = require("../controller/AttandanceController");

const router = express.Router();

router.get("/", AttandanceController.getAttendance);
router.post("/", AttandanceController.createAttendance);
router.delete("/:id", AttandanceController.deleteAttendance);
router.put("/:id", AttandanceController.updateAttendance);

module.exports = router;
