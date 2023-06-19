const express = require('express');

const MainController = require('./controllers/MainController');

const router = express.Router();

router.get('/balance', MainController.index);

router.post('/event', MainController.create);

module.exports = router;