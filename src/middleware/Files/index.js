const { Files } = require("../../models");

const validatePostFiles = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Fournissez des valeurs correct" });
    const [files] = await Files.findOneByName(title);
    if (files.length) return res.status(422).json({ message: "Un fichier sous ce nom existe déjà" });
    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports = { validatePostFiles };