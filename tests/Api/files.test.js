const request = require("supertest");
const { query } = require("../../db-connection");
// const app = require("../../src/app");
const app = require("../../src/server");

const filePayload = {
  title: "Speed Triple",
  start_date: "2008-04-05",
  end_date: "2022-01-24",
  src: "../../public/images/Speed-Triple-1050.jpg",
  description: "Voici ma moto un Speed Triple 1050 de chez Triumph",
};

const badFilePayload = {
  title: "Speed Triple",
  src: "../../public/images/Speed-Triple-1050.jpg",
  description: "Voici ma moto un Speed Triple 1050 de chez Triumph",
};

describe("Files API Endpoint", () => {
  beforeAll(async () => {
    const sql = "DELETE FROM files WHERE id > 0";
    const sql2 = "ALTER TABLE files AUTO_INCREMENT=1";
    await query(sql);
    await query(sql2);
  });

  describe("Create a new file with valid value", () => {
    it("POST /api/files/ and should obtain { id:1, title: 'Z1000', start_date: '2004-01-01', end_date: '2008-01-01', src: '../../public/Z1000', ...}", async () => {
      const res = await request(app).post("/api/files/").send(filePayload);
      expect(res.statusCode).toBe(201);
    });
  });

  describe("Create a new file with no all necessary value", () => {
    it("POST /api/files/ and should obtain code 400", async () => {
      const res = await request(app).post("/api/files/").send(badFilePayload);
      expect(res.statusCode).toBe(422);
    });
  });

  describe("Create a new file with existing src", () => {
    it("POST /api/files/ and should obtain code 422", async () => {
      const res = await request(app).post("/api/files/").send(filePayload);
      expect(res.statusCode).toBe(422);
    });
  });

  describe("Find files where file not existing", () => {
    it("GET /api/files/2 and should obtain code 404", async () => {
      const res = await request(app).get("/api/files/2");
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({});
    });
  });

  describe("Find All files", () => {
    it("GET /api/files and should obtain [{...}]", async () => {
      const res = await request(app).get("/api/files/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.any(Number) })]));
    });
  });

  describe("Updated file where file not existing", () => {
    it("PUT /api/files/2 and should obtain code 404", async () => {
      const res = await request(app).put("/api/files/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Updated file with good value to be modified", () => {
    it("PUT /api/files/1 and should obtain code 200", async () => {
      const res = await request(app).put("/api/files/1").send({ title: "Speed Triple" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE file not existing", () => {
    it("DELETE /api/files/2 and should obtain code 404", async () => {
      const res = await request(app).delete("/api/files/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE file existing", () => {
    it("DELETE /api/files/1 and should obtain code 204", async () => {
      const res = await request(app).delete("/api/files/1").send();
      expect(res.statusCode).toBe(204);
    });
  });
});
