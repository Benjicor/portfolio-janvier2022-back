const authRouter = require("express").Router();
const { AuthController, UserController } = require("../controllers");

// GET
authRouter.get("/logOut", AuthController.verifyAccessToken, AuthController.logOut);

// POST
authRouter.post("/connect", AuthController.connect, AuthController.createAccessToken);
authRouter.post("/verifyCredentials", UserController.verifyCredentials);

module.exports = authRouter;
