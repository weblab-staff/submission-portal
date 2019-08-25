const request = require("supertest");
const mongoose = require("mongoose");
const assert = require("assert");
const app = require("../app");

const classObj = {
  year: 2019,
  team_size_cap: 3,
  admins: ["cory2067"],
};

describe("Class API tests", () => {
  before(async () => await mongoose.connection.db.dropDatabase());

  let _id;
  it("should add a new class", (done) => {
    request(app)
      .post("/api/class")
      .set("Accept", "application/json")
      .send(classObj)
      .expect(200)
      .then((res) => {
        _id = res.body._id;
        assert(_id !== undefined);
        done();
      });
  });

  it("should set the active year", (done) => {
    request(app)
      .post(`/api/class/${_id}/set-active-year`)
      .expect(204)
      .then((res) => {
        return request(app)
          .get(`/api/class`)
          .expect(200);
      })
      .then((res) => {
        assert(res.body[0].is_active);
        done();
      });
  });

  it("should add a new admin", (done) => {
    request(app)
      .post(`/api/class/${_id}/admins`)
      .send({
        admin_github_username: "asipser",
      })
      .then((res) => {
        return request(app)
          .get(`/api/class`)
          .expect(200);
      })
      .then((res) => {
        assert(res.body[0].admins.includes("asipser"));
        assert(res.body[0].admins.includes("cory2067"));
        done();
      });
  });

  it("should delete an admin", (done) => {
    request(app)
      .delete(`/api/class/${_id}/admins`)
      .send({
        admin_github_username: "cory2067",
      })
      .then((res) => {
        return request(app)
          .get(`/api/class`)
          .expect(200);
      })
      .then((res) => {
        assert(res.body[0].admins.includes("asipser"));
        assert(!res.body[0].admins.includes("cory2067"));
        done();
      });
  });

  it("should set the team size cap", (done) => {
    request(app)
      .post(`/api/class/${_id}/team_size_cap`)
      .send({
        team_size_cap: 5,
      })
      .then((res) => {
        return request(app)
          .get(`/api/class`)
          .expect(200);
      })
      .then((res) => {
        assert(res.body[0].team_size_cap === 5);
        done();
      });
  });

  it("should set registration open", (done) => {
    request(app)
      .post(`/api/class/${_id}/registration`)
      .send({
        registration_open: true,
      })
      .then((res) => {
        return request(app)
          .get(`/api/class`)
          .expect(200);
      })
      .then((res) => {
        assert(res.body[0].registration_open);
        done();
      });
  });

  it("should reject duplicate class years", (done) => {
    request(app)
      .post("/api/class")
      .set("Accept", "application/json")
      .send(classObj)
      .expect(400)
      .then((res) => {
        done();
      });
  });
});
