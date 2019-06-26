const mongoose = require('mongoose');

before(() => {
  // wait for mongodb to connect before running test suite
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (mongoose.connection.db) {
        return resolve();
      }
    }, 100);
  });
});

after(() => {
  mongoose.connection.close();
});
