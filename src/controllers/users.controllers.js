const { User } = require("../models");

// Méthode qui permet de recuperer tous les utilisateurs
const findMany = async (req, res) => {
  try {
    const [results] = await User.findMany();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de recuperer un utilisateur par son ID
const findOneById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[results]] = await User.findOneById(id);
    if (!results) return res.status(404).send();
    return res.json(results);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de créer un utilisteur
const createOne = async (req, res) => {
  try {
    const [result] = await User.createOne(req.userInformation);
    const [[userCreated]] = await User.findOneById(result.insertId);
    return res.status(201).json({
      message: "Votre compte à bien été modifier",
      user: userCreated,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// Méthode qui permet de mettre a jour les informations d'un utilisteur par son ID
const updateOneById = async (req, res) => {
  try {
    await User.updateOneById(req.userInformation, req.params.id);
    const [[user]] = await User.findOneById(req.params.id);
    return res.status(200).json({ message: "Le compte à bien été modifier", user });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// Méthode qui permet de supprimer un utilisateur par son ID
const removeOneById = async (req, res) => {
  try {
    const [result] = await User.deleteOneById(req.params.id);
    if (!result.affectedRows) {
      return res.status(404).send();
    }
    return res.status(204).json({ message: "Le compte à bien été supprimer" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { findMany, findOneById, createOne, updateOneById, removeOneById };
