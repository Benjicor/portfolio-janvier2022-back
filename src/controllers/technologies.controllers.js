const { Technology } = require("../models");

// Méthode qui permet de recuperer toutes les technologies
const findMany = async (req, res) => {
  try {
    const [results] = await Technology.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de recuperer une technologie par son ID
const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[results]] = await Technology.findOneById(id);
    if (!results) return res.status(404).send();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de créer une technologie
const createOne = async (req, res) => {
  try {
    const [result] = await Technology.createOne(req.technologyInformation);
    const [[technologyCreated]] = await Technology.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre technologie à bien été créer",
      technology: technologyCreated,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Méthode qui permet de mettre a jour les informations d'une technologie par son ID
const updateOneById = async (req, res) => {
  try {
    await Technology.updateOneById(req.technologyInformation, req.params.id);
    const [[technology]] = await Technology.findOneById(req.params.id);
    return res.status(200).json({ message: "La technologie à bien été modifier", technology });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de supprimer une technologie par son ID
const removeOneById = async (req, res) => {
  try {
    const [result] = await Technology.deleteOneById(req.params.id);
    if (!result.affectedRows) {
      return res.status(404).send();
    }
    return res.status(204).json({ message: "La technologie à bien été supprimer" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, removeOneById };
