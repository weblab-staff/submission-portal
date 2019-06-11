/* Defines all routes under /api/emails/ */

const express = require('express');
const router = express.Router();
const Email = require('../models/Email');

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
