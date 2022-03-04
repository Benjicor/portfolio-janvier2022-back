const authRouter = require("express").Router();
const { AuthController /* UserController */ } = require("../controllers");

// authRouter.get("/", AuthController.verifyAccessToken, UserController.getUserById);

authRouter.post("/connect", AuthController.connect, AuthController.createAccessToken);

module.exports = authRouter;
