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
// CORS configuration to allow frontend requests
const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow specific Cloudflare Pages domains and localhost
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://f373b628.expense-tracker-c0r-8xw.pages.dev'
    ];
    
    // Also allow any .pages.dev domain as they're all Cloudflare Pages
    if (origin.includes('.pages.dev')) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
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
