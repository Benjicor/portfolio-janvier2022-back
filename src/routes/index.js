const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const filesRouter = require("./files.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/files", filesRouter);

module.exports = mainRouter;