const express = require('express');
const router = express.Router();
const healthRoutes = require('./health');
const authRoutes = require('./auth');
const expenseRoutes = require('./expenses');

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);

module.exports = router;
