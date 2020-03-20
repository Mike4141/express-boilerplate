const supertest = require("supertest");
const app = require("../src/app");
const knex = require("knex");

describe("reviews", function() {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });
  after("disconnect from db", () => db.destroy());
  before("clean the table", () => db("reviews").truncate());
  afterEach("cleanup", () => db("reviews").truncate());

  describe("GET /api/review", () => {
    const testProducts = [
      {
        id: 1,
        name: "dryer"
      }
    ];

    beforeEach("insert review", () => {
      return db.into("cities").insert(testProducts);
    });

    it("should return array of products", () => {
      return supertest(app)
        .get("")
        .set("Accept", "application/json")
        .expect(200, testProducts);
    });
  });
});
