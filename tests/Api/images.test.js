const request = require("supertest");
const { query } = require("../../db-connection");
// const app = require("../../src/app");
const app = require("../../src/server");

const imagePayload = {
  alt: "Speed Triple",
  src: "../../public/images/Speed-Triple-1050.jpg",
  description: "Voici ma moto un Speed Triple 1050 de chez Triumph",
  files_id: 1,
};

const badImagePayload = {
  alt: "Speed Triple",
  files_id: 1,
};

describe("Images API Endpoint", () => {
  beforeAll(async () => {
    const sql = "DELETE FROM files WHERE id > 0"; // DELETE LA TABLE
    const sql2 = "ALTER TABLE files AUTO_INCREMENT=1"; // ALTER LA TABLE
    const sql3 =
      "INSERT INTO files VALUES (1,'Mon projet', '2008-04-05', '2022-01-24', '2022-01-26','../../public/Presentation-du-Projet.pages', 'Voici un projet de reprise')"; // INSERT UN FICHIER DANS LA TABLE
    const sql4 = "DELETE FROM images WHERE id > 0"; // DELETE LA TABLE
    const sql5 = "ALTER TABLE images AUTO_INCREMENT=1"; // ALTER LA TABLE
    await query(sql);
    await query(sql2);
    await query(sql3);
    await query(sql4);
    await query(sql5);
  });

  describe("Create a new image with valid value", () => {
    it("POST /api/images/ and should obtain { id:1, alt: 'Speed Triple', src: '../../public/Speed-Triple-1050.jpg', description: 'Voici ma moto un Speed Triple 1050 de chez Triumph', ...}", async () => {
      const res = await request(app).post("/api/images/").send(imagePayload);
      expect(res.statusCode).toBe(201);
    });
  });

  describe("Create a new image with no all necessary value", () => {
    it("POST /api/images/ and should obtain code 400", async () => {
      const res = await request(app).post("/api/images/").send(badImagePayload);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("Create a new image with existing src", () => {
    it("POST /api/images/ and should obtain code 422", async () => {
      const res = await request(app).post("/api/images/").send(imagePayload);
      expect(res.statusCode).toBe(422);
    });
  });

  describe("Find images where image not existing", () => {
    it("GET /api/images/2 and should obtain code 404", async () => {
      const res = await request(app).get("/api/images/2");
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({});
    });
  });

  describe("Find All images", () => {
    it("GET /api/images and should obtain [{...}]", async () => {
      const res = await request(app).get("/api/images/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.any(Number) })]));
    });
  });

  describe("Updated image where image not existing", () => {
    it("PUT /api/images/2 and should obtain code 404", async () => {
      const res = await request(app).put("/api/images/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Updated image with good value to be modified", () => {
    it("PUT /api/images/1 and should obtain code 200", async () => {
      const res = await request(app).put("/api/images/1").send({ src: "../../public/Speed-Triple-1050.jpg" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE image not existing", () => {
    it("DELETE /api/images/2 and should obtain code 404", async () => {
      const res = await request(app).delete("/api/images/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE image existing", () => {
    it("DELETE /api/images/1 and should obtain code 204", async () => {
      const res = await request(app).delete("/api/images/1").send();
      expect(res.statusCode).toBe(204);
    });
  });
});
