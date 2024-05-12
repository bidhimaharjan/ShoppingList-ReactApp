const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

const mongoose = require('mongoose');
const routes = require('./routes');

// Middleware
app.use(morgan("dev")); // Logging middleware
app.use(bodyParser.json()); // Body parsing middleware

// Swagger setup
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Flowers Stock Api Services',
        version: '1.0.0',
        description: 'API for a flowers stock management system',
      },
    },
    apis: ['./routes/*.js', './models/*.js'], 
  };
  
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger middleware

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected!!!"))
    .catch(err => console.error("Database Connection Error:", err.message));

app.use(cors());

// Routes
app.use('/api', routes); // Mounting index routes

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Backend Services is listening on port: ${port}`);
});