/* Defines all routes under /api/teams/ */

const express = require('express');
const router = express.Router();
const Team = require('../models/Team');

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
