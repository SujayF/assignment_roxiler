const express = require('express');
const router = express.Router();
const { getPieChartData } = require('../controllers/pieChartDataController');

router.route('/:month').get(getPieChartData);

module.exports = router;