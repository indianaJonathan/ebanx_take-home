const express = require('express');

const MainController = require('./controllers/MainController');

const router = express.Router();

router.get('/', MainController.get);

router.get('/balance', MainController.index);

router.post('/event', MainController.create);

router.post('/reset', MainController.reset);

module.exports = router;