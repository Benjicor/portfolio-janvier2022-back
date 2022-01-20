const { closeConnection } = require("../db-connection");
const app = require("../server");

const closeApp = () =>
  new Promise((resolve, reject) => {
    app.close((err) => {
      if (err) reject(err);
      else resolve();
    });
  });

afterAll(async () => {
  await closeConnection();
  await closeApp();
});
