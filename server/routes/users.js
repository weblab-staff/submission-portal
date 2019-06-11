/* Defines all routes under /api/users/ */

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
