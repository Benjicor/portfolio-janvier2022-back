const { connection } = require("../../db-connection");

class User {
  static findMany() {
    const sql = "SELECT * FROM users";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT id, firstname, lastname, username, email FROM users WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static createOne(userInformation) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql, [userInformation]);
  }

  static updateOneById(userInformation, id) {
    const sql = "UPDATE users SET ? WHERE id=?";
    return connection.promise().query(sql, [userInformation, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = User;
