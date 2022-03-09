const argon2 = require("argon2");
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

  static getOneById(id) {
    const sql = "SELECT id, email FROM users WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static updateOneById(userInformation, id) {
    const sql = "UPDATE users SET ? WHERE id=?";
    return connection.promise().query(sql, [userInformation, id]);
  }

  static createOne(userInformation) {
    const sql = "INSERT INTO users SET ?";
    return connection.promise().query(sql, [userInformation]);
  }

  static findOneByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static getAllByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    const [results] = await connection.promise().query(sql, [email]);
    return results.length > 0;
  }

  static async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  static async verifyPassword(password, hashedPassword) {
    const valid = await argon2.verify(hashedPassword, password);
    return valid;
  }

  static verifyLengthPassword(password) {
    return password.length > 10;
  }
}

module.exports = User;
