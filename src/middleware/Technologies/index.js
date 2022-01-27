const { Technology } = require("../../models");

const validatePutTechnology = async (req, res, next) => {
  try {
    const { name, src } = req.body;
    // Vérifie si le fichier existe bien dans la BDD
    const [[technology]] = await Technology.findOneById(req.params.id);
    if (!technology) return res.sendStatus(404);
    // Vérifie qu'au moins un des champs valide a la modification est bien dans le body de la requete
    if (!name && !src) {
      return res.status(400).json({ message: "Fournissez des valeurs correct" });
    }
    // Object qui permettra de stocker les différentes informations reçu depuis le body de la requete
    const technologyInformation = {};
    if (name) {
      technologyInformation.name = name;
    }
    if (src) {
      technologyInformation.src = src;
    }
    // On envoie dans la requete l'objet des valeurs saisie depuis la requete
    req.technologyInformation = technologyInformation;
    next();
  } catch (e) {
    return res.status(500).send(e);
  }
};

const validatePostTechnology = async (req, res, next) => {
  try {
    const { name, src } = req.body;
    const technology = { name, src };
    const [[technologyExist]] = await Technology.findOneBySrc(src);
    if (technologyExist) return res.sendStatus(422);
    if (name && src) {
      req.technologyInformation = technology;
      next();
    } else {
      return res.status(400).json({ message: "Toutes les valeurs nécessaires à l'entrée du fichier sont requises" });
    }
  } catch (err) {
    return res.send(err.message);
  }
};

module.exports = {
  validatePutTechnology,
  validatePostTechnology,
};
