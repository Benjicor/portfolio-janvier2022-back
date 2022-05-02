require("dotenv").config();

const app = require("./app");

const { connection } = require("../db-connection");

const server = app.listen(process.env.PORT || 8000, (err) => {
  if (err) return console.log(err.message);
  console.log(`La connexion au serveur a réussi sur le port http://localhost:${process.env.PORT || 8000}`);

  // Test connexion to MYSQL DB
  return connection.connect((err2) => {
    if (err2) return console.log(err2.message);
    return console.log(`La connexion MySQL à la base de données ${process.env.DB_NAME} de ${process.env.DB_USER} a réussi`);
  });
});

module.exports = server;
