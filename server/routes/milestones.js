/* Defines all routes under /api/milestones/ */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({});
});

module.exports = router;
