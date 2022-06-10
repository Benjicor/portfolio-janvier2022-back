require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/* Affectation de déstructuration. Il s'agit d'un moyen d'extraire 
des données de tableaux ou d'objets dans des variables distinctes. */
const { ACCESS_JWT_SECRET /* , REFRESH_JWT_SECRET */ } = process.env;

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

// Méthode qui permet d'effacer les cookies et envoyer un code d'état
const logOut = (req, res) => {
  if (req.cookies.token) {
    res.clearCookie("token").clearCookie("id").sendStatus(200);
  } else {
    res.status(400).send("Une erreur est survenue");
  }
};

// Méthode qui permet de créer un jeton JWT et le placer comme cookie dans la réponse.
const createAccessToken = async (req, res) => {
  const id = req.userId;
  const token = jwt.sign({ id }, ACCESS_JWT_SECRET, {
    expiresIn: "15m",
  });
  // const refreshToken = jwt.sign({ id }, REFRESH_JWT_SECRET, {
  //   expiresIn: "1440m",
  // });

  res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 900000,
      secure: "false" === "true",
      sameSite: "lax",
    })
    .cookie("id", id, {
      maxAge: 900000,
      secure: "false" === "true",
      sameSite: "lax",
    })
    // .cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 86400000,
    //   secure: "false" === "true",
    //   sameSite: "lax",
    // })
    .json({ id });
};

// Méthode qui permet de vérifier si l'utilisateur a un jeton d'accès valide et, si c'est le cas, ajoute le jeton décodé à la demande.
const verifyAccessToken = async (req, res, next) => {
  const { token /* , refreshToken */ } = req.cookies;
  if (token /* , refreshToken */) {
    jwt.verify(
      token,
      ACCESS_JWT_SECRET,
      /* refreshToken, REFRESH_JWT_SECRET, */ (err, decoded) => {
        if (err) {
          res.clearCookie("token");
          res.clearCookie("id");
          // res.clearCookie("refreshToken");
          res.sendStatus(403);
        } else {
          req.user = decoded;
          next();
        }
      },
    );
  } else {
    res.clearCookie("token");
    res.clearCookie("id");
    // res.clearCookie("refreshToken");
    res.status(403).send("Accès non autorisé");
  }
};

// const createRefreshToken = async (req, res) => {
//   // Je récupère mon token dans la requete
//   const { token } = req.cookies;
//   let payload;
//   // Je vérifie la validité de mon token et attribue le résultat dans ma variable payload.
//   // Je traite les différents types d'erreurs.
//   try {
//     payload = jwt.verify(await token, ACCESS_JWT_SECRET);
//   } catch (e) {
//     if (e instanceof jwt.JsonWebTokenError) {
//       return res.status(401).send("Votre JWT n'est pas authorisé");
//     }
//     return res.status(400).send("Mauvaise demande");
//   }
//   // Je prend la date actuelle de la requete en format seconde ?
//   const nowUnixSeconds = Math.round(Number(new Date()) / 1000);
//   // Si je suis à plus de 2 min déxpiration de mon token, je ne fais rien
//   if (payload.exp - nowUnixSeconds < 30) {
//     return res.status(500).json({ token });
//   }
//   // Je créé un nouveau token et l'envoi dans mon cookie
//   const newToken = jwt.sign({ id: payload.id }, ACCESS_JWT_SECRET, { expiresIn: "60m" });
//   // Envoie un cookie avec le nom refreshToken et la valeur de la variable refreshToken.
//   return res.status(200).cookie("token", newToken).send({ id: payload.id });
// };

module.exports = {
  connect,
  logOut,
  createAccessToken,
  verifyAccessToken,
  // createRefreshToken,
};
