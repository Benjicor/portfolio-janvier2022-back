const mainRouter = require("express").Router();
const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");
const filesRoutes = require("./files.routes");
const imagesRoutes = require("./images.routes");
const technologiesRoutes = require("./technologies.routes");
const emailRoutes = require("./emails.routes");

mainRouter.use("/users", usersRoutes);
mainRouter.use("/auth", authRoutes);
mainRouter.use("/files", filesRoutes);
mainRouter.use("/images", imagesRoutes);
mainRouter.use("/technologies", technologiesRoutes);
mainRouter.use("/emails", emailRoutes);

module.exports = mainRouter;
