const mainRouter = require("express").Router();
const usersRouter = require("./users.routes");
const filesRouter = require("./files.routes");
const imagesRouter = require("./images.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/files", filesRouter);
mainRouter.use("/images", imagesRouter);

module.exports = mainRouter;
