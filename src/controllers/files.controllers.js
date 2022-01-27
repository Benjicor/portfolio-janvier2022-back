const { File } = require("../models");

// Méthode qui permet de recuperer tous les fichiers
const findMany = async (req, res) => {
  try {
    const [results] = await File.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de recuperer un fichier par son ID
const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[results]] = await File.findOneById(id);
    if (!results) return res.status(404).send();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de créer un fichier
const createOne = async (req, res) => {
  try {
    const [result] = await File.createOne(req.fileInformation);
    const [[fileCreated]] = await File.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre fichier à bien été créer",
      file: fileCreated,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Méthode qui permet de mettre a jour les informations d'un fichier par son ID
const updateOneById = async (req, res) => {
  try {
    await File.updateOneById(req.fileInformation, req.params.id);
    const [[file]] = await File.findOneById(req.params.id);
    return res.status(200).json({ message: "Le fichier à bien été modifier", file });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de supprimer un fichier par son ID
const removeOneById = async (req, res) => {
  try {
    const [result] = await File.deleteOneById(req.params.id);
    if (!result.affectedRows) {
      return res.status(404).send();
    }
    return res.status(204).json({ message: "Le fichier à bien été supprimer" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, removeOneById };
