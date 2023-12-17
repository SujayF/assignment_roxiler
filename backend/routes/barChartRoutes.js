const express = require('express');
const router = express.Router();
const { getChartData } = require('../controllers/barChartDataController');

router.get('/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const chartData = await getChartData(month);
    res.json(chartData);
  } catch (error) {
    console.error('Error retrieving chart data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
