const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { ACCESS_JWT_SECRET, ACCESS_JWT_EXPIRESIN, ACCESS_JWT_COOKIE_MAXAGE, ACCESS_JWT_COOKIE_SECURE } = process.env;

const connect = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const [results] = await User.getAllByEmail(email);
    if (!results.length) {
      res.status(401).send("email ou mot de passe incorrect");
    } else {
      const validPassword = await User.validatePassword(password, results[0].password);
      if (validPassword) {
        req.userId = results[0].id;
        next();
      } else {
        res.status(401).send("email ou mot de passe incorrect");
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createAccessToken = async (req, res) => {
  const id = req.userId;
  const token = jwt.sign({ id }, ACCESS_JWT_SECRET, {
    expiresIn: ACCESS_JWT_EXPIRESIN,
  });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10),
      secure: ACCESS_JWT_COOKIE_SECURE === "true",
      sameSite: "lax",
    })
    .json({ id, expiresIn: parseInt(ACCESS_JWT_COOKIE_MAXAGE, 10) });
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
