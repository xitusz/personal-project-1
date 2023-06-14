const router = require("express").Router();
const registerRouter = require("./registerRouter");
const loginRouter = require("./loginRouter");

router.use("/register", registerRouter);
router.use("/login", loginRouter);

module.exports = router;
