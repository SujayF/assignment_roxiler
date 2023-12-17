const Transaction = require('../models/model');

const getTransactionsByMonth = async (month) => {
    try {
      const transactions = await Transaction.find({
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
        },
      });
      return transactions;
    } catch (error) {
      console.error('Error retrieving transactions:', error.message);
      throw error;
    }
  };
  
  module.exports = getTransactionsByMonth;
  