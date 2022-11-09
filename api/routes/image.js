const express = require('express');
const router = express.Router();

const ImageController = require('../controllers/images');

router.post('/', ImageController.AddImage);

module.exports = router;
