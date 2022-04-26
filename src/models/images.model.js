const { connection } = require("../../db-connection");

class Images {
  static findMany() {
    const sql = "SELECT * FROM images";
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM images WHERE id=?";
    return connection.promise().query(sql, [id]); // [id]= se que l'on attends en resultat
  }

  static findOneByAlt(alt) {
    const sql = "SELECT * FROM images WHERE alt=?";
    return connection.promise().query(sql, [alt]); // [id]= se que l'on attends en resultat
  }

  static findOneBySrc(src) {
    const sql = "SELECT * FROM images WHERE src=?";
    return connection.promise().query(sql, [src]);
  }

  static createOne(images) {
    const sql = "INSERT INTO images SET ?";
    return connection.promise().query(sql, [images]);
  }

  static updateOneById(imageInformation, id) {
    const sql = "UPDATE images SET ? WHERE id=?";
    return connection.promise().query(sql, [imageInformation, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM images WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findImagesByFilesId(id) {
    const sql = "SELECT * FROM images WHERE files_id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Images;
