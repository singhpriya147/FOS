
const express = require('express');
const bodyParser = require('body-parser');
const pricingRoutes=require('./src/routes/pricingRoutes')
const client = require('./src/connection');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express')

const dotenv = require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/food', pricingRoutes);

const options={
  definition:{
    openapi:'3.0.0',
   info:{
    title:'Food Ordering system',
    version:'1.0.0',
   },
   servers:[
    {
     url: 'http://localhost:5000/'
    }
   ]

  },
  apis:['./src/routes/pricingRoutes.js']
}

const swaggerSpec=swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))


const postgresURL = process.env.DB_URL;

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: process.env.DB_HOST,
//   username: 'postgres',
//   password: process.env.DB_PASSWORD,
//   database: 'FOS',
// });
const sequelize = new Sequelize(postgresURL, {
  dialect: 'postgres', // Explicitly specify the dialect
});
// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });








// Start the server
const port = process.env.PORT || 3000;
console.log(process.env.PORT);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

client.connect();