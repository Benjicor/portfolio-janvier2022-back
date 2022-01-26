const request = require("supertest");
const { query } = require("../../db-connection");
const app = require("../../src/app");

const imagePayload = {
  alt: "Speed Triple",
  src: "../../public/Speed-Triple-1050.jpg",
  description: "Voici ma moto un Speed Triple 1050 de chez Triumph",
  files_id: 1,
};

const badImagePayload = {
  alt: "Speed Triple",
  description: "Voici ma moto un Speed Triple 1050 de chez Triumph",
};

describe("Images API Endpoint", () => {
  beforeAll(async () => {
    const sql = "DELETE FROM images WHERE id > 0";
    const sql2 = "ALTER TABLE images AUTO_INCREMENT=1";
    await query(sql);
    await query(sql2);
  });

  describe("Create a new image with valid value", () => {
    it("POST /api/images/ and should obtain { id:1, alt: 'Z1000', src: '../../public/Z1000', ...}", async () => {
      const res = await request(app).post("/api/images/").send(imagePayload);
      console.log(res);
      expect(res.statusCode).toBe(201);
    });
  });

  describe("Create a new image with no all necessary value", () => {
    it("POST /api/images/ and should obtain code 400", async () => {
      const res = await request(app).post("/api/images/").send(badImagePayload);
      expect(res.statusCode).toBe(422);
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
      const res = await request(app).put("/api/images/1").send({ alt: "Speed Triple" });
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
