const express = require('express');

const path = require('path');

const router = express.Router();

const rootDir = require('../util/path');

router.get('/contact-us', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact-us.html'))
})

router.post('/success', (req, res, next) => {
    res.redirect('/success');
})
module.exports = router;