const request = require("supertest");
const mongoose = require("mongoose");
const assert = require("assert");
const app = require("../app");

const Class = require("../models/Class");
const User = require("../models/User");

describe("User API tests", () => {
  let _id;

  before(async () => {
    await mongoose.connection.db.dropDatabase();

    // Create a mock class
    const testClass = new Class({
      year: 2019,
      is_active: true,
    });

    await testClass.save();

    // Add a test user who signed in for the first time
    const testUser = new User({
      github_username: "cory2067",
      first_name: "Cory",
      last_name: "Lynch",
      year: 2019,
    });

    _id = (await testUser.save())._id;

    // random other users
    await new User({ github_username: "meme", year: 2019 }).save();
    await new User({ github_username: "notmeme", year: 2018 }).save();
  });

  const getUser = () => {
    return request(app)
      .get(`/api/users/${_id}`)
      .expect(200);
  };

  it("should update the user", (done) => {
    request(app)
      .post(`/api/users/${_id}/update`)
      .set("Accept", "application/json")
      .send({
        email: "cor@mit.edu",
      })
      .expect(204)
      .then(() => getUser())
      .then((res) => {
        assert.equal("cor@mit.edu", res.body[0].email);
        done();
      });
  });

  it("should list all users of the current year", (done) => {
    request(app)
      .get("/api/users")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        assert.equal(2, res.body.length);
        done();
      });
  });

  it("should list all users of a custom year", (done) => {
    request(app)
      .get("/api/users?class_year=2018")
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        assert.equal(1, res.body.length);
        assert.equal("notmeme", res.body[0].github_username);
        done();
      });
  });

  it("should add a new tag to the user", (done) => {
    request(app)
      .post(`/api/users/${_id}/tag`)
      .set("Accept", "application/json")
      .send({
        tag: "meme",
      })
      .expect(204)
      .then(() => getUser())
      .then((res) => {
        assert.equal(1, res.body[0].tags.length);
        assert.equal("meme", res.body[0].tags[0]);
        done();
      });
  });

  it("should delete a new tag from the user", (done) => {
    request(app)
      .delete(`/api/users/${_id}/tag`)
      .set("Accept", "application/json")
      .send({
        tag: "meme",
      })
      .expect(204)
      .then(() => getUser())
      .then((res) => {
        assert.equal(0, res.body[0].tags.length);
        done();
      });
  });

  it("should delete a user", (done) => {
    request(app)
      .delete(`/api/users/${_id}`)
      .expect(204)
      .then(() => getUser())
      .then((res) => {
        assert.equal(0, res.body.length);
        done();
      });
  });

  it("should fail when updating a user who doesn't exist", (done) => {
    request(app)
      .post(`/api/users/${_id}/update`)
      .set("Accept", "application/json")
      .send({
        email: "cor@mit.edu",
      })
      .expect(404, done);
  });
});
