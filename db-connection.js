/* Chargement des variables d'environnement à partir du fichier .env. */
require("dotenv").config();

/* Importing the mysql2 module. */
const mysql = require("mysql2");

/* Création d'un objet de configuration qui sera utilisé pour se connecter à la base de données */
let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true,
};

/* Vérifier si l'environnement est défini sur test. S'il l'est, il utilisera la base de données de test. */
if (process.env.NODE_ENV === "test") {
  config = {
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASS_TEST,
    database: process.env.DB_NAME_TEST,
    multipleStatements: true,
  };
}

/* C'est une promesse qui est en train d'être créée */
const connection = mysql.createConnection(config);

/**
 * Prend une chaîne de requête et un tableau de valeurs,
 * et renvoie une promesse qui se résout au résultat de la requête
 * @param args - Les arguments à passer à la requête.
 * @returns Une promesse qui sera résolue par le résultat de la requête.
 */
const query = (...args) => {
  return new Promise((resolve, reject) => {
    connection.query(...args, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

/**
 * Ferme la connexion à la base de données si elle est ouverte, et renvoie une promesse :
 * la connexion est fermée avec succès ou si elle était déjà fermée,
 * et retourne une promesse qui indique si la connexion est fermée.
 */
const closeConnection = () => {
  return new Promise((resolve, reject) => {
    if (connection) {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

module.exports = {
  connection,
  closeConnection,
  query,
};
