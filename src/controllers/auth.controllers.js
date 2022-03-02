const { User } = require("../models");

const connect = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [results] = await User.getAllByEmail(email);
    if (!results.length) {
      res.status(401).send("email ou mot de passe incorrect");
    } else {
      const validPassword = await User.validatePassword(password, results[0].password);
      if (validPassword) {
        res.send("Vous êtes connecté");
      } else {
        res.status(401).send("email ou mot de passe incorrect");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  connect,
};
