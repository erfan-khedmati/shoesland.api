const router = require('express').Router();
const controller = require("../controllers/auth.controller");
// Middleware
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/register", authMiddleware, controller.register);
router.post("/login", authMiddleware, controller.login);
router.get('/isAuth', controller.isAuth);

module.exports = router;