const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

// All routes require authentication
router.use(authenticate);

// @route   GET /api/expenses
router.get('/', getExpenses);

// @route   GET /api/expenses/:id
router.get('/:id', getExpense);

// @route   POST /api/expenses
router.post('/', createExpense);

// @route   PUT /api/expenses/:id
router.put('/:id', updateExpense);

// @route   DELETE /api/expenses/:id
router.delete('/:id', deleteExpense);

module.exports = router;
