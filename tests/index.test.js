const request = require("supertest");
const server  =  require("../src/app");

describe("get /api/ response", () => {
  test("It should send success message with 200 status.", async () => {
    const response = await request(server)
      .get("/api/")
      
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("success");
  });
});