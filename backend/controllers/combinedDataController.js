const { getChartData } = require("../controllers/barChartDataController");
const {calculateMonthlyStatistics} = require("../controllers/monthlyController");
const { getPieChartData } = require("../controllers/pieChartDataController");



const getCombinedData = async (month) => {
  try {
    
    const pieChartData = await getPieChartData(month);

    const chartData = await getChartData(month);

    const monthlyStatistics = await calculateMonthlyStatistics(month);

    

    // Combine the responses
    const combinedData = {
      chartData,
      monthlyStatistics,
      pieChartData,
    };

    return combinedData;
  } catch (error) {
    console.error("Error retrieving combined data:", error);
    throw error;
  }
};

module.exports = {
  getCombinedData,
};
