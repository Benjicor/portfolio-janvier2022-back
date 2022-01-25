const { User } = require("../../models");

const validatePutUser = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    // Vérifie si l'utilisateur existe bien dans la BDD
    const [[user]] = await User.findOneById(req.params.id);
    if (!user) return res.sendStatus(404);
    // Vérifie qu'au moins un des champs valide a la modification est bien dans le body de la requete
    if (!firstname && !lastname && !username && !email && !password) {
      return res.status(400).json({ message: "Fournissez des valeurs correct" });
    }
    // Object qui permettra de stocker les différentes informations reçu depuis le body de la requete
    const userInformation = {};
    if (firstname) {
      userInformation.firstname = firstname;
    }
    if (lastname) {
      userInformation.lastname = lastname;
    }
    if (username) {
      userInformation.username = username;
    }
    if (email) {
      userInformation.email = email;
    }
    if (password) {
      userInformation.password = password;
    }
    // On envoie dans la requete l'objet des valeurs saisie depuis la requete
    req.userInformation = userInformation;
    next();
  } catch (e) {
    return res.status(500).send(e);
  }
};

const validatePostUser = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const user = { firstname, lastname, username, email, password };
    const [userExist] = await User.findOneByEmail(email);
    if (userExist.length) return res.sendStatus(422);
    if (firstname && lastname && email && password && username) {
      req.userInformation = user;
      next();
    } else {
      return res.status(422).json({ message: "Toutes les valeurs nécessaires a l'inscription sont requises" });
    }
  } catch (err) {
    return res.send(err.message);
  }
};

module.exports = {
  validatePutUser,
  validatePostUser,
};
