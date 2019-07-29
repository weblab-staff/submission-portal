const mongoose = require("mongoose");

before(() => {
  // wait for mongodb to connect before running test suite
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (mongoose.connection.db) {
        clearInterval(interval);
        return resolve();
      }
    }, 100);
  });
});

after(() => {
  mongoose.disconnect();
});
