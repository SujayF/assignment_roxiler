const Transaction = require('../models/model');

const getPaginatedProducts = async (page, limit) => {
  try {
    const startIndex = (page - 1) * limit;

    const products = await Transaction.find().skip(startIndex).limit(limit);
    const totalProducts = await Transaction.countDocuments();
    

    const paginationInfo = {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
    };

    return { products, pagination: paginationInfo };
  } catch (error) {
    console.error('Error retrieving paginated products:', error.message);
    throw error;
  }
};
  
  module.exports = {getPaginatedProducts};
