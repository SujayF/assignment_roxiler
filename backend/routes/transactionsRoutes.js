const express = require('express');
const router = express.Router();
const getTransactionsByMonth = require('../controllers/transactionController');

router.get('/:month', async (req, res) => {
  try {
    const month = req.params.month;
    const transactions = await getTransactionsByMonth(month);
    res.json(transactions);
  } catch (error) {
    console.error('Error handling request:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
