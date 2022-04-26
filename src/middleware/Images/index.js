const { Image } = require("../../models");

const validatePutImage = async (req, res, next) => {
  try {
    const { alt, src, description, files_id } = req.body;
    // Vérifie si l'image existe bien dans la BDD
    const [[image]] = await Image.findOneById(req.params.id);
    if (!image) return res.sendStatus(404);
    // Vérifie qu'au moins un des champs valide a la modification est bien dans le body de la requete
    if (!alt && !src && !description && !files_id) {
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
    if (files_id) {
      imageInformation.files_id = files_id;
    }
    // On envoie dans la requete l'objet des valeurs saisie depuis la requete
    req.imageInformation = imageInformation;
    return next();
  } catch (e) {
    return res.status(500).send(e);
  }
};

const validatePostImage = async (req, res, next) => {
  try {
    const { description, files_id } = req.body;
    if (files_id && description) {
      req.imageInformation = {
        description,
        files_id,
        alt: req.files[0].filename,
        src: req.files[0].filename,
      };
      return next();
    }
    return res.status(400).json({ message: "Toutes les valeurs nécessaires à l'entrée de l'image sont requises" });
  } catch (err) {
    return res.send(err.message);
  }
};

module.exports = {
  validatePutImage,
  validatePostImage,
};
