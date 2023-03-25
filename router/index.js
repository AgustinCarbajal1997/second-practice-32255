const { Router } = require("express");
const router = Router();

const UserRouter = require("./users.router");

const usersRouter = new UserRouter();

router.use("/api", usersRouter.getRouter());

module.exports = router;
