/* 
   Defines all routes under /api
   Sets up all other modules in this directory
*/

const express = require("express");
const util = require("./util");
const MockLogin = require("../tests/mocklogin");
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

const socketMock = {
  join: () => {},
  emit: () => {},
};

socketMock.in = () => socketMock;

if (process.env.NODE_ENV === "test") {
  router.use((req, res, next) => {
    // mock logged in user
    req.user = MockLogin.getUser();

    // mock socket with no-ops (until we have a real way to test)
    const socketmap = {};
    if (req.body.user_id) socketmap[req.body.user_id] = socketMock;
    if (req.user) socketmap[req.user._id] = socketMock;
    req.app.set("socketmap", socketmap);
    req.app.set("socketio", socketMock);
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
