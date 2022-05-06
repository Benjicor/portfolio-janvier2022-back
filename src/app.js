require("dotenv").config();

/* Importation du module express. */
const express = require("express");

/* Permet au front de communiquer avec l'API. */
const cors = require("cors");

/* Permet d'utiliser des cookies. */
const cookieParser = require("cookie-parser");

/* Importe les routes depuis le dossier routes. */
const mainRoutes = require("./routes");

/* Création d'une instance de l'application express. */
const app = express();

/* On configure cors pour autoriser uniquement le front à 
communiquer avec notre API et pour avoir accès aux cookies. */
app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN],
    credentials: true,
  }),
);

/* Middleware qui analyse le corps de la demande et 
le rend disponible dans la propriété req.body. */
app.use(express.json());

/* Nous permet d'utiliser le dossier des images dans le dossier public. */
app.use("/images", express.static("public/images"));

/* Nous permet d'utiliser des cookies. */
app.use(cookieParser());

/* Middleware qui préfixe toutes les routes avec /api. */
app.use("/api", mainRoutes);

module.exports = app;
