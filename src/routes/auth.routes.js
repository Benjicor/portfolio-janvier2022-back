const authRouter = require("express").Router();
const { AuthController } = require("../controllers");

authRouter.post("/connect", AuthController.connect, AuthController.createAccessToken);

module.exports = authRouter;
