/* 
   Defines all routes under /api
   Sets up all other modules in this directory
*/

const express = require('express');
const router = express.Router();

router.use('/teams', require('./teams'));
router.use('/users', require('./users'));
router.use('/milestones', require('./milestones'));
router.use('/emails', require('./emails'));
router.use('/class', require('./class'));

router.get('/whoami', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(req.user);
  }

  res.send({});
});

module.exports = router;
