const express = require('express');

const router = express.Router();

const contactUsController = require('../controllers/contact-us');

router.get('/contact-us', contactUsController.getContactUs);

router.post('/', contactUsController.postContactUs);

module.exports = router;