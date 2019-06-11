/* Defines all routes under /api/milestones/ */

const express = require('express');
const router = express.Router();
const Milestone = require('../models/Milestone');

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
