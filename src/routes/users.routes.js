const usersRouter = require("express").Router();

const { UserController } = require("../controllers");
const { validatePutUser, validatePostUser } = require("../middleware/User");

// GET
usersRouter.get("/", UserController.findMany);
usersRouter.get("/:id", UserController.findOneById);

// POST
usersRouter.post("/", validatePostUser, UserController.createOneUser, UserController.getOneUserById);

// PUT
usersRouter.put("/:id", validatePutUser, UserController.updateOneById);

// DELETE
usersRouter.delete("/:id", UserController.removeOneById);

module.exports = usersRouter;
