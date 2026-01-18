const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);

// Helpful message for GET requests
router.get('/register', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Method not allowed. Please use POST request.',
    endpoint: 'POST /api/auth/register',
    example: {
      method: 'POST',
      url: '/api/auth/register',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }
    }
  });
});

router.get('/login', (req, res) => {
  res.status(405).json({
    success: false,
    message: 'Method not allowed. Please use POST request.',
    endpoint: 'POST /api/auth/login',
    example: {
      method: 'POST',
      url: '/api/auth/login',
      body: {
        email: 'john@example.com',
        password: 'password123'
      }
    }
  });
});

module.exports = router;
