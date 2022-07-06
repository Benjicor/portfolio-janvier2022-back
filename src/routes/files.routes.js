const filesRouter = require("express").Router();

const { FilesController } = require("../controllers");
const { validatePutFile, validatePostFile } = require("../middleware/Files");

// GET
filesRouter.get("/", FilesController.findMany);
filesRouter.get("/:id", FilesController.findOneById);

// POST
filesRouter.post("/", validatePostFile, FilesController.createOne);

// PUT
filesRouter.put("/:id", validatePutFile, FilesController.updateOneById);

// DELETE
filesRouter.delete("/:id", FilesController.removeOneById);

module.exports = filesRouter;
