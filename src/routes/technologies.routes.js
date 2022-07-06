const technologiesRouter = require("express").Router();

const { TechnologiesController } = require("../controllers");
const { validatePutTechnology, validatePostTechnology } = require("../middleware/Technologies");

// GET
technologiesRouter.get("/", TechnologiesController.findMany);
technologiesRouter.get("/:id", TechnologiesController.findOneById);

// POST
technologiesRouter.post("/", validatePostTechnology, TechnologiesController.createOne);

// PUT
technologiesRouter.put("/:id", validatePutTechnology, TechnologiesController.updateOneById);

// DELETE
technologiesRouter.delete("/:id", TechnologiesController.removeOneById);

module.exports = technologiesRouter;
