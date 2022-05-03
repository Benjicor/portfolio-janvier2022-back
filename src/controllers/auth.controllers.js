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

const logOut = (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token").clearCookie("id").sendStatus(200);
  } else {
    res.status(400).send("Une erreur est survenue");
  }
};

const createAccessToken = async (req, res) => {
  const id = req.userId;
  const token = jwt.sign({ id }, ACCESS_JWT_SECRET, {
    expiresIn: "60m",
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: "false" === "true",
      sameSite: "lax",
    })
    .cookie("id", id, {
      maxAge: 3600000,
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
        res.clearCookie("id");
        res.sendStatus(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.clearCookie("token");
    res.clearCookie("id");
    res.status(403).send("Accès non autorisé");
  }
};

module.exports = {
  connect,
  logOut,
  createAccessToken,
  verifyAccessToken,
};
