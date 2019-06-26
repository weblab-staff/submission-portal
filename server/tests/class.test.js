const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

const classObj = {
  year: 2019,
  team_size_cap: 3,
  admins: ['cory2067'],
};

describe('Class API tests', () => {
  before(async () => await mongoose.connection.db.dropDatabase())
  
  let _id;
  it('should add a new class', (done) => {
    request(app)
      .post('/api/class')
      .set('Accept', 'application/json')
      .send(classObj)
      .expect(204)
      .then(response => {
          _id = response._id
          done();
      });
  });

  it('should set the active year', (done) => {
      done(new Error("nvm this api is broke"));
  });
});
