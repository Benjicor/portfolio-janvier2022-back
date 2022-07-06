const mainRouter = require("express").Router();

/* Importation des routes à partir des autres fichiers. */
const usersRouter = require("./users.routes");
const authRouter = require("./auth.routes");
const filesRouter = require("./files.routes");
const imagesRouter = require("./images.routes");
const technologiesRouter = require("./technologies.routes");
const emailRouter = require("./emails.routes");

mainRouter.use("/users", usersRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/files", filesRouter);
mainRouter.use("/images", imagesRouter);
mainRouter.use("/technologies", technologiesRouter);
mainRouter.use("/emails", emailRouter);

module.exports = mainRouter;
