const imagesRouter = require("express").Router();

const { ImagesController } = require("../controllers");
const { validatePutImage, validatePostImage } = require("../middleware/Images");

// GET
imagesRouter.get("/", ImagesController.findMany);
imagesRouter.get("/:id", ImagesController.findOneById);

// POST
imagesRouter.post("/", validatePostImage, ImagesController.createOne);

// PUT
imagesRouter.put("/:id", validatePutImage, ImagesController.updateOneById);

// DELETE
imagesRouter.delete("/:id", ImagesController.removeOneById);

module.exports = imagesRouter;
