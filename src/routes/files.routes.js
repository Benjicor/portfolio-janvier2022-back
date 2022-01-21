const filesRouter = require("express").Router();

const { FilesController } = require("../controllers");
const { validatePostFiles } = require("../middleware/Files");
// const { validatePostFiles } = require("../middleware/Files");

//GET
filesRouter.get("/", FilesController.findMany);
filesRouter.get("/:id", FilesController.findOneById);

//POST
filesRouter.post("/", validatePostFiles, FilesController.createOne);

//DELETE
filesRouter.delete("/:id", FilesController.removeOneById);

module.exports = filesRouter;