const request = require("supertest");
const mongoose = require("mongoose");
const assert = require("assert");
const app = require("../app");

const Class = require("../models/Class");
const User = require("../models/User");
const MockLogin = require("./mocklogin");
const Team = require("../models/Team");
const Milestone = require("../models/Milestone");

let _id;
const milestoneObj = {
  title: "memestone",
  description: "sql is for monkeys",
  handin_link: "http://handin.link",
  responses_link: "http://responses.link"
};

const otherMilestoneObj = {
  title: "worthless milestone",
  description: "sql is for monkeys",
  handin_link: "http://handin.link",
  responses_link: "http://responses.link"
};

describe("Milestone API tests", () => {
  before(async () => {
    await mongoose.connection.db.dropDatabase();

    // Create a mock class
    const testClass = new Class({
      year: 2019,
      is_active: true
    });

    await testClass.save();
  });

  const getMilestone = () => {
    return request(app)
      .get(`/api/milestones/${_id}`)
      .expect(200);
  };

  it("should create a new milestone", done => {
    request(app)
      .post(`/api/milestones`)
      .set("Accept", "application/json")
      .send(milestoneObj)
      .expect(200)
      .then(res => {
        _id = res.body._id;
        assert(_id);
        for (const key of Object.keys(milestoneObj)) {
          assert.strictEqual(res.body[key], milestoneObj[key]);
        }
        assert(!res.body.autograde);
        done();
      });
  });

  it("should get all milestones", done => {
    request(app)
      .post(`/api/milestones`)
      .set("Accept", "application/json")
      .send(otherMilestoneObj)
      .expect(200)
      .then(() => {
        request(app)
          .get(`/api/milestones`)
          .expect(200)
          .then(res => {
            assert.strictEqual(res.body.length, 2);
            done();
          });
      });
  });

  it("should set autograde", done => {
    request(app)
      .post(`/api/milestones/${_id}/set-autograde`)
      .set("Accept", "application/json")
      .send({ autograde: true })
      .expect(204)
      .then(getMilestone)
      .then(res => {
        assert(res.body._id);
        assert(res.body.autograde);
        done();
      });
  });

  it("should update a milestone", done => {
    request(app)
      .post(`/api/milestones/${_id}/update`)
      .set("Accept", "application/json")
      .send({ description: "uwu" })
      .expect(204)
      .then(getMilestone)
      .then(res => {
        assert(res.body._id);
        assert.strictEqual(res.body.description, "uwu");
        done();
      });
  });

  it("should delete a milestone", done => {
    request(app)
      .delete(`/api/milestones/${_id}`)
      .expect(204)
      .then(getMilestone)
      .then(res => {
        assert(!res.body._id);
        done();
      });
  });
});
