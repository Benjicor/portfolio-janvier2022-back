const multer = require("multer");
const { Image } = require("../models");

// Méthode qui permet de recuperer toutes les images
const findMany = async (req, res) => {
  try {
    const [results] = await Image.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de recuperer une image par son ID
const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[results]] = await Image.findOneById(id);
    if (!results) return res.status(404).send();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de créer une image
const createOne = async (req, res) => {
  try {
    const [result] = await Image.createOne(req.imageInformation);
    const [[imageCreated]] = await Image.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre image à bien été créer",
      image: imageCreated,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Méthode qui permet de mettre a jour les informations d'une image par son ID
const updateOneById = async (req, res) => {
  try {
    await Image.updateOneById(req.imageInformation, req.params.id);
    const [[image]] = await Image.findOneById(req.params.id);
    return res.status(200).json({ message: "L'image à bien été modifier", image });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de supprimer une image par son ID
const removeOneById = async (req, res) => {
  try {
    const [result] = await Image.deleteOneById(req.params.id);
    if (!result.affectedRows) {
      return res.status(404).send();
    }
    return res.status(204).json({ message: "L'image à bien été supprimer" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const uploadFile = (req, res, next) => {
  // Configuration du dossier où stocker l'image et le nom de l'image
  const storage = multer.diskStorage({
    destination: (req2, file, cb) => {
      cb(null, "public/images");
    },
    filename: (_, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // On configure multer pour sauvegarder un seul fichier qui est dans req.body.file
  const upload = multer({ storage }).single("file");
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json(err);
    } else {
      // On peut sauvegarder le nom et d'autres données de l'image dans une table de
      // ....
      // res.status(201).json({ filename: req.file.filename });
      req.picture = JSON.parse(req.pictureData);
      next();
    }
  });
};

module.exports = { findMany, findOneById, createOne, updateOneById, removeOneById, uploadFile };
