const axios = require('axios');
const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  description: String,
  category: String,
  image: String,
  sold: {
    type: Boolean,
    default: false,
  },
  dateOfSale: Date,
});

// Define a Mongoose model based on the transactionSchema
const Transaction = mongoose.model('Transaction', transactionSchema);

const fetchApiData = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from the API:', error.message);
    throw error;
  }
};

const saveDataToMongoDB = async (data) => {
  try {
    // Clear existing data in the collection
    await Transaction.deleteMany({});

    // Insert the new data
    await Transaction.insertMany(data);

    console.log('Data saved to MongoDB successfully.');
  } catch (error) {
    console.error('Error saving data to MongoDB:', error.message);
    throw error;
  }
};



// Main function to fetch data and save to MongoDB
const fetchDataAndSaveToMongoDB = async () => {
  try {
    const apiData = await fetchApiData();
    await saveDataToMongoDB(apiData);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

fetchDataAndSaveToMongoDB();

// Export the Transaction model for use in other files
module.exports = Transaction;
