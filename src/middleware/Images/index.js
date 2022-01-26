const { Image } = require("../../models");

const validatePutImage = async (req, res, next) => {
  try {
    const { alt, src, description } = req.body;
    // Vérifie si le fichier existe bien dans la BDD
    const [[image]] = await Image.findOneById(req.params.id);
    if (!image) return res.sendStatus(404);
    // Vérifie qu'au moins un des champs valide a la modification est bien dans le body de la requete
    if (!alt && !src && !description) {
      return res.status(400).json({ message: "Fournissez des valeurs correct" });
    }
    // Object qui permettra de stocker les différentes informations reçu depuis le body de la requete
    const imageInformation = {};
    if (alt) {
      imageInformation.alt = alt;
    }
    if (src) {
      imageInformation.src = src;
    }
    if (description) {
      imageInformation.description = description;
    }
    // On envoie dans la requete l'objet des valeurs saisie depuis la requete
    req.imageInformation = imageInformation;
    next();
  } catch (e) {
    return res.status(500).send(e);
  }
};

const validatePostImage = async (req, res, next) => {
  try {
    const { alt, src, description } = req.body;
    const image = { alt, src, description };
    const [[imageExist]] = await Image.findOneBySrc(src);
    if (imageExist) return res.sendStatus(422);
    if (alt && src) {
      req.imageInformation = image;
      next();
    } else {
      return res.status(400).json({ message: "Toutes les valeurs nécessaires à l'entrée de l'image sont requises" });
    }
  } catch (err) {
    return res.send(err.message);
  }
};

module.exports = {
  validatePutImage,
  validatePostImage,
};
