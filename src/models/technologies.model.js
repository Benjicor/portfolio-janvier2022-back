const { connection } = require("../../db-connection");

class Technologies {
  static findMany() {
    const sql = "SELECT * FROM technologies";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM technologies WHERE id=?";
    return connection.promise().query(sql, [id]); // [id]= se que l'on attends en resultat
  }

  static findOneByName(name) {
    const sql = "SELECT * FROM technologies WHERE name=?";
    return connection.promise().query(sql, [name]); // [id]= se que l'on attends en resultat
  }

  static findOneBySrc(src) {
    const sql = "SELECT * FROM technologies WHERE src=?";
    return connection.promise().query(sql, [src]);
  }

  static createOne(technologies) {
    const sql = "INSERT INTO technologies SET ?";
    return connection.promise().query(sql, [technologies]);
  }

  static updateOneById(technologyInformation, id) {
    const sql = "UPDATE technologies SET ? WHERE id=?";
    return connection.promise().query(sql, [technologyInformation, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM technologies WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Technologies;
