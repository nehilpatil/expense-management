const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add a new expense
router.post('/add', async (req, res) => {
  const { title, amount, date, category } = req.body;
  try {
    const newExpense = new Expense({ title, amount, date, category });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ error: 'Error adding expense' });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

// Get expenses by date
router.get('/daily/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const expenses = await Expense.find({ date: new Date(date) });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses by date:', error);
    res.status(500).json({ error: 'Error fetching expenses by date' });
  }
});

// Edit an expense
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, category } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(id, { title, amount, date, category }, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Error updating expense' });
  }
});

// Delete an expense
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Error deleting expense' });
  }
});

module.exports = router;

