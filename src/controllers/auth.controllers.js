require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { ACCESS_JWT_SECRET } = process.env;

// Méthode qui permet de vérifier que l'email existe et que le mot de passe est valide lors de la connexion
const connect = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [results] = await User.findOneByEmail(email);
    if (!results.length) {
      res.status(400).send("email ou mot de passe incorrect");
    } else {
      const validPassword = await User.verifyPassword(password, results[0].password);
      if (validPassword) {
        req.userId = results[0].id;
        next();
      } else {
        res.status(400).send("email ou mot de passe incorrect");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createAccessToken = async (req, res) => {
  const id = req.userId;
  const token = jwt.sign({ id }, ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 900000,
      secure: "false" === "true",
      sameSite: "lax",
    })
    .json({ id });
};

const verifyAccessToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, ACCESS_JWT_SECRET, (err, decoded) => {
      if (err) {
        res.clearCookie("token");
        res.sendStatus(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.clearCookie("token");
    res.status(403).send("Accès non autorisé");
  }
};

module.exports = {
  connect,
  createAccessToken,
  verifyAccessToken,
};
