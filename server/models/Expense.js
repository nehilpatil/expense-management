const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: false } // New field for categorization
});

module.exports = mongoose.model('Expense', ExpenseSchema);


