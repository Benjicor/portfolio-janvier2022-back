const { File } = require("../../models");

const validatePutFile = async (req, res, next) => {
  try {
    const { title, start_date, end_date, src, description } = req.body;
    // Vérifie si le fichier existe bien dans la BDD
    const [[file]] = await File.findOneById(req.params.id);
    if (!file) return res.sendStatus(404);
    // Vérifie qu'au moins un des champs valide a la modification est bien dans le body de la requete
    if (!title && !start_date && !end_date && !src && !description) {
      return res.status(400).json({ message: "Fournissez des valeurs correct" });
    }
    // Object qui permettra de stocker les différentes informations reçu depuis le body de la requete
    const fileInformation = {};
    if (title) {
      fileInformation.title = title;
    }
    if (start_date) {
      fileInformation.start_date = start_date;
    }
    if (end_date) {
      fileInformation.end_date = end_date;
    }
    if (src) {
      fileInformation.src = src;
    }
    if (description) {
      fileInformation.description = description;
    }
    // On envoie dans la requete l'objet des valeurs saisie depuis la requete
    req.fileInformation = fileInformation;
    return next();
  } catch (e) {
    return res.status(500).send(e);
  }
};

const validatePostFile = async (req, res, next) => {
  try {
    const { title, start_date, end_date, src, description } = req.body;
    const file = { title, start_date, end_date, src, description };
    const [[fileExist]] = await File.findOneBySrc(src);
    if (fileExist) return res.sendStatus(422);
    if (title && start_date && end_date && src) {
      req.fileInformation = file;
      return next();
    }
    return res.status(400).json({ message: "Toutes les valeurs nécessaires à l'entrée du fichier sont requises" });
  } catch (err) {
    return res.send(err.message);
  }
};

module.exports = {
  validatePutFile,
  validatePostFile,
};
