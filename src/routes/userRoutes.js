// user router

const router = require("express").Router();
const userController = require("../controllers/userController");

// baseURL: /TASK/
router.post("/auth/login", userController.login);
router.post("/auth/signup", userController.signup);

module.exports = router;
