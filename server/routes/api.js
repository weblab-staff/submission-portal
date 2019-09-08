/* 
   Defines all routes under /api
   Sets up all other modules in this directory
*/

const express = require("express");
const util = require("./util");
const MockLogin = require("../tests/mocklogin");
const sockets = require("../sockets");
const router = express.Router();

// Determine year from request
router.use(async (req, res, next) => {
  if (req.query.class_year) {
    req.year = parseInt(req.query.class_year);
    return next();
  }

  req.year = await util.get_active_year();
  next();
});

// various mocks for testing
if (process.env.NODE_ENV === "test") {
  // generate no-ops for socket
  const mock = sockets.mockInit();

  router.use((req, res, next) => {
    // mock logged in user
    req.user = MockLogin.getUser();

    if (req.body.user_id) sockets.addUser(req.body.user_id, mock);
    if (req.user) sockets.addUser(req.user, mock);
    next();
  });
}

router.use("/teams", require("./teams"));
router.use("/users", require("./users"));
router.use("/milestones", require("./milestones"));
router.use("/emails", require("./emails"));
router.use("/class", require("./class"));

router.get("/whoami", (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(req.user);
  }

  res.send({});
});

module.exports = router;
