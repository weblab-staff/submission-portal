const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Class API integration tests', () => {
  before(async () => await mongoose.connection.db.dropDatabase())
  it('should add a new class', (done) => {
    request(app)
      .post('/api/class')
      .set('Accept', 'application/json')
      .send({
        year: 2019,
        team_size_cap: 3,
        admins: ['cory2067'],
        is_active: true 
      })
      .expect(204, done);
  });
});
