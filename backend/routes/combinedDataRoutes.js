const express = require('express');
const router = express.Router();
const { getCombinedData } = require('../controllers/combinedDataController');


router.get('/:month', async (req, res) => {
  try {
    const month = parseInt(req.params.month) || 1;
    const combinedData = await getCombinedData(month);
    res.json(combinedData);
  } catch (error) {
    console.error('Error retrieving combined data:', error.message);
    res.status(500).json({ error: 'Error retrieving combined data' });
  }
});


module.exports = router;
