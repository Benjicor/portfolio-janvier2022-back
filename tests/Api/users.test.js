const request = require("supertest");
const { query } = require("../../db-connection");
const app = require("../../src/app");

const userPayload = {
  firstname: "Benjamin",
  lastname: "CORDREAUX",
  username: "Benjicor",
  email: "cordreaux.benjamin@gmail.com",
  password: "test",
};

const badUserPayload = {
  firstname: "Benjamin",
  lastname: "CORDREAUX",
  password: "test",
};

describe("Users API Endpoint", () => {
  beforeAll(async () => {
    const sql = "DELETE FROM users WHERE id > 0";
    const sql2 = "ALTER TABLE users AUTO_INCREMENT=1";
    await query(sql);
    await query(sql2);
  });

  describe("Create a new user with valid value", () => {
    it("POST /api/users/ and should obtain { id:1, firstname: 'Xa', lastname: 'Ge', email: 'test@gmail.com', ...}", async () => {
      const res = await request(app).post("/api/users/").send(userPayload);
      console.log(res);
      expect(res.statusCode).toBe(201);
    });
  });

  describe("Create a new user with no all necessary value", () => {
    it("POST /api/users/ and should obtain code 400", async () => {
      const res = await request(app).post("/api/users/").send(badUserPayload);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("Create a new user with existing email", () => {
    it("POST /api/users/ and should obtain code 422", async () => {
      const res = await request(app).post("/api/users/").send(userPayload);
      expect(res.statusCode).toBe(422);
    });
  });

  describe("Find users where user not existing", () => {
    it("GET /api/users/2 and should obtain code 404", async () => {
      const res = await request(app).get("/api/users/2");
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({});
    });
  });

  describe("Find All users", () => {
    it("GET /api/users and should obtain [{...}]", async () => {
      const res = await request(app).get("/api/users/");
      expect(res.status).toBe(200);
      expect(res.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: expect.any(Number) })]));
    });
  });

  describe("Updated user where user not existing", () => {
    it("PUT /api/users/2 and should obtain code 404", async () => {
      const res = await request(app).put("/api/users/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Updated user with good value to be modified", () => {
    it("PUT /api/users/1 and should obtain code 200", async () => {
      const res = await request(app).put("/api/users/1").send({ username: "Benjicor" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe("DELETE user not existing", () => {
    it("DELETE /api/users/2 and should obtain code 404", async () => {
      const res = await request(app).delete("/api/users/2").send();
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE user existing", () => {
    it("DELETE /api/users/1 and should obtain code 204", async () => {
      const res = await request(app).delete("/api/users/1").send();
      expect(res.statusCode).toBe(204);
    });
  });
});