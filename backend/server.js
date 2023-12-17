const path  = require('path')
const express = require('express');
const port =  5100;
const {MongoClient} = require('mongodb')
const connectDB = require('./config/db');
const cors = require('cors');






connectDB();


const app = express();


app.use(
    cors({
      origin: '*', // Replace with specific domains as needed
      methods: 'GET, POST, PUT, DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    })
  );
  


app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/transactions', require('./routes/transactionsRoutes'));
app.use('/api/monthlydata', require('./routes/mothlyStatisticsRoutes'))
app.use('/api/chartdata', require('./routes/barChartRoutes') )
app.use('/api/piechartdata', require('./routes/pieChartRoutes'));
app.use('/api/combined', require('./routes/combinedDataRoutes'))

app.listen(port,()=>
    console.log(`Server started on port ${port}`)
);