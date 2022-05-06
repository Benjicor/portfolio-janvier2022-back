/* Importation du modèle File à partir du dossier des modèles. */
const { File } = require("../../models");

/**
 * Il vérifie que le fichier existe dans la base de données, que le corps de la requête contient
 * au moins un champ valide.
 * Il vérifie si le fichier existe dans la base de données, si le corps de la requête contient
 * au moins un champ valide à mettre à jour, et si oui, il stocke les nouvelles valeurs dans un
 * objet et l'envoie au middleware suivant.
 * @param req - l'objet de la requête.
 * @param res - L'objet de réponse
 * @param next - La fonction middleware suivante dans la pile.
 * @returns middleware suivant dans la pile.
 */
const validatePutFile = async (req, res, next) => {
  try {
    const { title, start_date, end_date, src, description } = req.body;
    // Vérifie si le fichier existe bien dans la BDD
    const [[file]] = await File.findOneById(req.params.id);
    if (!file) return res.sendStatus(404);
    // Vérifie qu'au moins un des champs valide a la modification est bien dans le body de la requête
    if (!title && !start_date && !end_date && !src && !description) {
      return res.status(400).json({ message: "Fournissez des valeurs correct" });
    }
    // Object qui permettra de stocker les différentes informations reçu depuis le body de la requête
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
    // On envoie dans la requête l'objet des valeurs saisie depuis la requete
    req.fileInformation = fileInformation;
    return next();
  } catch (e) {
    return res.status(500).send(e);
  }
};

/**
 * Il vérifie si le fichier existe déjà dans la base de données, s'il n'existe pas, il vérifie
 * si les valeurs requises sont présentes dans le corps de la requête.
 * Si c'est le cas, il les ajoute à l'objet de la requête et appelle le middleware suivant.
 * Si ce n'est pas le cas, il envoie une erreur 400.
 * @param req - l'objet de la requête
 * @param res - l'objet réponse
 * @param next - La fonction middleware suivante dans la pile.
 * @returns renvoie le résultat de la fonction next().
 */
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
