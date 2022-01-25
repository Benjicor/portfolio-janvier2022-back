const { connection } = require("../../db-connection");

class Files {
  static findMany() {
    const sql = "SELECT * FROM files";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM files WHERE id=?";
    return connection.promise().query(sql, [id]); // [id]= se que l'on attends en resultat
  }

  static findOneByName(title) {
    const sql = "SELECT * FROM files WHERE title=?";
    return connection.promise().query(sql, [title]); // [id]= se que l'on attends en resultat
  }

  static findOneBySrc(src) {
    const sql = "SELECT * FROM files WHERE src=?";
    return connection.promise().query(sql, [src]);
  }

  static createOne(files) {
    const sql = "INSERT INTO files SET title=?";
    return connection.promise().query(sql, [files]);
  }

  static updateOneById(fileInformation, id) {
    const sql = "UPDATE files SET ? WHERE id=?";
    return connection.promise().query(sql, [fileInformation, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM files WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Files;
