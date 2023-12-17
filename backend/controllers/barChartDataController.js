const Transaction = require('../models/model');


const getChartData = async (month) => {
    try {
      const aggregationPipeline = [
        {
          $match: {
            $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
          },
        },
        {
          $sort: {
            price: 1,
          },
        },
        {
          $bucket: {
            groupBy: '$price',
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
            default: '901-above',
            output: {
              count: { $sum: 1 },
            },
          },
        },
        {
          $project: {
            _id: 0,
            priceRange: '$_id',
            count: 1,
          },
        },
      ];
  
      const result = await Transaction.aggregate(aggregationPipeline);
      return result;
    } catch (error) {
      console.error('Error retrieving chart data:', error.message);
      throw error;
    }
  };


  
  
  module.exports = {
    getChartData,
  };
  