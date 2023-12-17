const Transaction = require('../models/model');


const calculateMonthlyStatistics = async (month) => {
    try {
      // Calculate total sale amount
      const totalSaleAmount = await Transaction.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
            },
            sold: true,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$price' },
          },
        },
      ]);
  
      // Calculate total number of sold items
      const totalSoldItems = await Transaction.countDocuments({
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
        },
        sold: true,
      });
  
      // Calculate total number of unsold items
      const totalUnsoldItems = await Transaction.countDocuments({
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
        },
        sold: false,
      });
  
      return {
        totalSaleAmount: totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
        totalSoldItems,
        totalUnsoldItems,
      };
    } catch (error) {
      console.error('Error calculating monthly statistics:', error.message);
      throw error;
    }
  };




  module.exports = { calculateMonthlyStatistics };





