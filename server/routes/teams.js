/* Defines all routes under /api/teams/ */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
