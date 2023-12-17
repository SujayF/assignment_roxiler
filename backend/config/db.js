
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const localMongoDBURI = process.env.MONGO_URI || 'mongodb://localhost:27017/products_database';

    const conn = await mongoose.connect(localMongoDBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Ensure that the database 'products_database' exists
    const adminDb = conn.connection.db.admin();
    const databaseList = await adminDb.listDatabases();
    const databaseNames = databaseList.databases.map((db) => db.name);

    if (!databaseNames.includes('products_database')) {
      await adminDb.createDatabase('products_database');
      console.log('Database "products_database" created successfully!');
    }
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1);
  }
};



module.exports = connectDB;
