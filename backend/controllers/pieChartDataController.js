const Transaction = require('../models/model');
const {Mongoose} = require('mongoose')



// const getPieChartData = async (month) => {
//   try {
//     const pieChartData = await Transaction.aggregate([
//       {
//         $match: {
//           $expr: {
//             $eq: [{ $month: "$dateOfSale" }, month],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 },
//         },
//       },
//     ]);

//     return pieChartData;
//   } catch (error) {
//     console.error('Error retrieving pie chart data:', error);
//     throw error;
//   }
// };

const getPieChartData = async (month) => {
  try {
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, month],
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log('Pie Chart Data:', pieChartData);

    return pieChartData;
  } catch (error) {
    console.error('Error retrieving pie chart data:', error);
    throw error;
  }
};




module.exports = {
  getPieChartData
};
