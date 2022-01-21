const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");

mainRouter.use("/users", usersRouter);

module.exports = mainRouter;
