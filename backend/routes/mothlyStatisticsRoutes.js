const express = require("express");
const { Module } = require("module");
const router = express.Router();
const {calculateMonthlyStatistics } = require("../controllers/monthlyController")


router.route('/:month').get(async (req, res) => {
  try {
    const month = req.params.month;
    const statistics = await calculateMonthlyStatistics(month);
    res.json(statistics);
  } catch (error) {
    console.error('Error retrieving statistics:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


