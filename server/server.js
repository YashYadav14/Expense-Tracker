const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Expense Tracker API' });
});

// 404 Handler - must be after all routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error Handler - must be last middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
