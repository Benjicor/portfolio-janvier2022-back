const { Files } = require("../models");

// Méthode qui permet de recuperer tous les fichiers
const findMany = async (req, res) => {
  try {
    const [results] = await Files.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Méthode qui permet de recuperer un fichier par son ID
const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[results]] = await Files.findOneById(id);
    if (!results) return res.status(404).send();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Méthode qui permet de créer un fichier
const createOne = async (req, res) => {
  try {
    const [result] = await Files.createOne(req.filesInformation);
    const [[filesCreated]] = await Files.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre fichier à bien été modifier",
      files: filesCreated,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Méthode qui permet de mettre a jour les informations d'un fichier par son ID
const updateOneById = async (req, res) => {
  try {
    await Files.updateOneById(req.filesInformation, req.params.id);
    const [[files]] = await Files.findOneById(req.params.id);
    return res.status(200).json({ message: "Le fichier à bien été modifier", files });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Méthode qui permet de supprimer un fichier par son ID
const removeOneById = async (req, res) => {
  try {
    const [result] = await Files.deleteOneById(req.params.id);
    if (!result.affectedRows) {
      return res.status(404).send();
    }
    return res.status(204).json({ message: "Le fichier à bien été supprimer" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, removeOneById };