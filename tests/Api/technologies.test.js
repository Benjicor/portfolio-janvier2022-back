const request = require("supertest");
const { query } = require("../../db-connection");
const app = require("../../src/app");

const technologyPayload = {
  name: "Node.js",
  src: "../../public/nodejs.svg",
};

const badTechnologyPayload = {
  src: "../../public/nodejs.svg",
};

describe("technologies API Endpoint", () => {
  beforeAll(async () => {
    const sql = "DELETE FROM technologies WHERE id > 0";
    const sql2 = "ALTER TABLE technologies AUTO_INCREMENT=1";
    await query(sql);
    await query(sql2);
  });

  describe("Create a new technology with valid value", () => {
    it("POST /api/technologies/ and should obtain { id:1, name: 'Javascript', ...}", async () => {
      const res = await request(app).post("/api/technologies/").send(technologyPayload);
      expect(res.statusCode).toBe(201);
    });
  });

  describe("Create a new technology with no all necessary value", () => {
    it("POST /api/technologies/ and should obtain code 400", async () => {
      const res = await request(app).post("/api/technologies/").send(badTechnologyPayload);
      expect(res.statusCode).toBe(422);
    });
  });

  describe("Create a new technology with existing src", () => {
    it("POST /api/technologies/ and should obtain code 422", async () => {
      const res = await request(app).post("/api/technologies/").send(technologyPayload);
      expect(res.statusCode).toBe(422);
    });
  });

  describe("Find technologies where technology not existing", () => {
    it("GET /api/technologies/2 and should obtain code 404", async () => {
      const res = await request(app).get("/api/technologies/2");
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({});
    });
  });

  describe("Find All technologies", () => {
    it("GET /api/technologies and should obtain [{...}]", async () => {
      const res = await request(app).get("/api/technologies/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.any(Number) })]));
    });
  });

  describe("Updated technology where technology not existing", () => {
    it("PUT /api/technologies/2 and should obtain code 404", async () => {
      const res = await request(app).put("/api/technologies/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Updated technology with good value to be modified", () => {
    it("PUT /api/technologies/1 and should obtain code 200", async () => {
      const res = await request(app).put("/api/technologies/1").send({ name: "Node.js" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE technology not existing", () => {
    it("DELETE /api/technologies/2 and should obtain code 404", async () => {
      const res = await request(app).delete("/api/technologies/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE technology existing", () => {
    it("DELETE /api/technologies/1 and should obtain code 204", async () => {
      const res = await request(app).delete("/api/technologies/1").send();
      expect(res.statusCode).toBe(204);
    });
  });
});
