const Expense = require('../models/Expense');

// @desc    Get all expenses for logged-in user
// @route   GET /api/expenses
// @access  Private
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching expenses',
      error: error.message,
    });
  }
};

// @desc    Get single expense by ID
// @route   GET /api/expenses/:id
// @access  Private
const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Ensure user owns this expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this expense',
      });
    }

    res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching expense',
      error: error.message,
    });
  }
};

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
const createExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    // Validation - Required fields
    if (amount === undefined || !category || !date) {
      return res.status(400).json({
        success: false,
        message: 'Please provide amount, category, and date',
      });
    }

    // Validation - Amount
    if (typeof amount !== 'number' || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid number',
      });
    }
    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0',
      });
    }

    // Validation - Category
    const trimmedCategory = category.trim();
    if (trimmedCategory.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category cannot be empty',
      });
    }

    // Validation - Date
    const expenseDate = new Date(date);
    if (isNaN(expenseDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid date',
      });
    }

    // Create expense with userId from authenticated user
    const expense = await Expense.create({
      userId: req.user.id,
      amount,
      category: trimmedCategory,
      date: expenseDate,
      note: note ? note.trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      data: expense,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating expense',
      error: error.message,
    });
  }
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Ensure user owns this expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this expense',
      });
    }

    // Validation - Amount if provided
    if (req.body.amount !== undefined) {
      if (typeof req.body.amount !== 'number' || isNaN(req.body.amount)) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a valid number',
        });
      }
      if (req.body.amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be greater than 0',
        });
      }
    }

    // Validation - Category if provided
    if (req.body.category !== undefined) {
      const trimmedCategory = req.body.category.trim();
      if (trimmedCategory.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Category cannot be empty',
        });
      }
      req.body.category = trimmedCategory;
    }

    // Validation - Date if provided
    if (req.body.date !== undefined) {
      const expenseDate = new Date(req.body.date);
      if (isNaN(expenseDate.getTime())) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid date',
        });
      }
      req.body.date = expenseDate;
    }

    // Validation - Note if provided
    if (req.body.note !== undefined) {
      req.body.note = req.body.note.trim();
    }

    // Update expense
    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: expense,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error updating expense',
      error: error.message,
    });
  }
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    // Ensure user owns this expense
    if (expense.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this expense',
      });
    }

    await Expense.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Expense deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid expense ID',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error deleting expense',
      error: error.message,
    });
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
