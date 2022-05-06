/* eslint-disable no-console */
require("dotenv").config();

/* Importation du fichier app.js */
const app = require("./app");

/* Destructuration de la propriété de connexion du module db-connection. */
const { connection } = require("../db-connection");

/* Écoute sur le port 8000. */
const server = app.listen(process.env.PORT || 8000, (err) => {
  if (err) return console.log(err.message);
  console.log(`La connexion au serveur a réussi sur le port http://localhost:${process.env.PORT || 8000}`);

  /* Il s'agit d'une fonction de rappel qui est appelée lorsque la connexion à la base de données est établie. */
  return connection.connect((err2) => {
    if (err2) return console.log(err2.message);
    return console.log(`La connexion MySQL à la base de données ${process.env.DB_NAME} de ${process.env.DB_USER} a réussi`);
  });
});

module.exports = server;
