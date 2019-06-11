/* Defines all routes under /api/class/ */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
