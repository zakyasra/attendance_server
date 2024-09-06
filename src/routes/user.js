const express = require("express");
const UserController = require("../controller/UserController");

const router = express.Router();

router.get("/", UserController.getUser);
router.get("/:id", UserController.detailUser);
router.post("/", UserController.createUser);
router.delete("/:id", UserController.deleteUser);
router.put("/:id", UserController.updateUser);

module.exports = router;
