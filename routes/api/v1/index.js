const express = require('express');

const router = express.Router();
console.log("router loaded v1")

router.use('/doctors',require('./doctors'));
router.use('/patients',require('./patients'));

module.exports = router;