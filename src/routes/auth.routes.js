const authRouter = require("express").Router();
const { AuthController, UserController } = require("../controllers");

// authRouter.get("/", AuthController.verifyAccessToken, UserController.getUserById);

// POST
authRouter.post("/connect", AuthController.connect, AuthController.createAccessToken);
authRouter.post("/verifyCredentials", UserController.verifyCredentials);

module.exports = authRouter;
