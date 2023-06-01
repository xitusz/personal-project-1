const router = require("express").Router();
const registerRouter = require("./registerRouter");

router.use("/register", registerRouter);

module.exports = router;
