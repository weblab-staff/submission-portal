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
const members = [];
const teamObj = {
  team_name: "meme team",
  is_competing: true,
  year: 2019
};

describe("Team API tests", () => {
  before(async () => {
    await mongoose.connection.db.dropDatabase();

    // Create a mock class
    const testClass = new Class({
      year: 2019,
      is_active: true
    });

    await testClass.save();

    // req.user will refer to user1
    const user1 = await MockLogin.login({
      github_username: "cory2067",
      first_name: "Cory",
      last_name: "Lynch",
      year: 2019
    });

    const user2 = await new User({
      github_username: "jynnie",
      first_name: "Jessica",
      last_name: "Tang",
      year: 2019
    }).save();

    const user3 = await new User({
      github_username: "aspiser",
      first_name: "Aaron",
      last_name: "Sipser",
      year: 2019
    }).save();

    members.push(user1);
    members.push(user2);
    members.push(user3);
  });

  const getTeam = () => {
    return request(app)
      .get(`/api/teams/${_id}`)
      .expect(200);
  };

  it("should create a new team", done => {
    request(app)
      .post(`/api/teams`)
      .set("Accept", "application/json")
      .send(teamObj)
      .expect(200)
      .then(res => {
        _id = res.body._id;
        assert(_id);
        assert.strictEqual(res.body.team_name, teamObj.team_name);
        assert.strictEqual(res.body.members.length, 1);
        assert.strictEqual(res.body.members[0]._id, members[0]._id.toString());
        done();
      });
  });

  it("should get a team", done => {
    getTeam().then(res => {
      assert.strictEqual(res.body.team_name, teamObj.team_name);
      assert.strictEqual(res.body.members.length, 1);
      assert.strictEqual(res.body.members[0]._id, members[0]._id.toString());
      done();
    });
  });

  it("should get all teams", done => {
    // add a second team
    new Team({
      team_name: "bad team",
      competing: false,
      year: 2019,
      members: [members[2]]
    })
      .save()
      .then(() => {
        return request(app)
          .get(`/api/teams`)
          .expect(200)
          .then(res => {
            assert.strictEqual(res.body.length, 2);
            const teams = res.body.map(t => t.team_name);
            assert(teams[0] === "meme team" || teams[0] === "bad team");
            assert(teams[1] === "meme team" || teams[1] === "bad team");
            assert.notStrictEqual(teams[0], teams[1]);
            done();
          });
      });
  });

  it("should add a new team member", done => {
    request(app)
      .post(`/api/teams/${_id}`)
      .set("Accept", "application/json")
      .send({ user_id: members[1]._id.toString() })
      .expect(204)
      .then(getTeam)
      .then(res => {
        assert.strictEqual(res.body.members.length, 2);
        assert.strictEqual(
          res.body.members[1].github_username,
          members[1].github_username
        );
        done();
      });
  });

  it("should mark milestone complete", done => {
    new Milestone({
      title: "stone",
      year: 2019
    })
      .save()
      .then(milestone => {
        request(app)
          .post(`/api/teams/${_id}/mark-complete`)
          .set("Accept", "application/json")
          .send({
            milestone_id: milestone._id
          })
          .expect(204)
          .then(() => getTeam())
          .then(res => {
            assert.strictEqual(res.body.submissions.length, 1);
            assert.strictEqual(
              res.body.submissions[0].milestone.title,
              "stone"
            );
            done();
          });
      });
  });

  it("should get all teams and populate", done => {
    // add a second team
    request(app)
      .get(`/api/teams?populate=true`)
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.length, 2);
        const sub = res.body[0].submissions[0];
        assert.strictEqual("stone", sub.milestone.title);
        assert(sub.timestamp);
        assert(!sub.form_response);
        done();
      });
  });

  it("should get all teams and populate with content", done => {
    // add a second team
    request(app)
      .get(`/api/teams?populate=true&include_content=true`)
      .expect(200)
      .then(res => {
        assert.strictEqual(res.body.length, 2);
        const sub = res.body[0].submissions[0];
        assert.strictEqual("stone", sub.milestone.title);
        assert(sub.timestamp);
        assert(sub.form_response);
        done();
      });
  });

  it("should set competing", done => {
    request(app)
      .post(`/api/teams/${_id}/set-competing`)
      .set("Accept", "application/json")
      .send({ competing: false })
      .expect(204)
      .then(getTeam)
      .then(res => {
        assert(!res.body.competing);
        done();
      });
  });

  it("should remove a member", done => {
    request(app)
      .delete(`/api/teams/${_id}/remove-member`)
      .send({ user_id: members[1]._id })
      .expect(204)
      .then(getTeam)
      .then(res => {
        assert.strictEqual(res.body.members.length, 1);
        assert.strictEqual(
          res.body.members[0].github_username,
          members[0].github_username
        );
        return User.findById(members[1]._id);
      })
      .then(user => {
        assert(!user.team);
        done();
      });
  });

  it("should delete a team", done => {
    request(app)
      .delete(`/api/teams/${_id}`)
      .expect(204)
      .then(getTeam)
      .then(res => {
        assert(!res._id);
        return User.findById(members[0]._id);
      })
      .then(user => {
        assert(!user.team);
        done();
      });
  });
});
