const express = require('express');
const banksController = require('../controllers/banksController');

const router = express.Router();

router.route('/near/:lat/:lng').get(banksController.getBanksNearUser);

module.exports = router;
