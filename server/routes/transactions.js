const express = require('express')
const router = express.Router()
const Transaction = require('../models/Transaction')

// GET all transactions (sorted newest first)
router.get('/', async (req, res) => {
  try {
    const { type, category, limit = 100 } = req.query
    const filter = {}
    if (type) filter.type = type
    if (category) filter.category = category

    const transactions = await Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .limit(Number(limit))

    res.json(transactions)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' })
  }
})

// GET summary (totals)
router.get('/summary', async (req, res) => {
  try {
    const [income, expense] = await Promise.all([
      Transaction.aggregate([
        { $match: { type: 'income' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Transaction.aggregate([
        { $match: { type: 'expense' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
    ])

    const totalIncome = income[0]?.total || 0
    const totalExpense = expense[0]?.total || 0

    res.json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary' })
  }
})

// POST create a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body

    if (!type || !amount || !description || !category || !date) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const transaction = new Transaction({ type, amount, description, category, date })
    const saved = await transaction.save()
    res.status(201).json(saved)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message })
    }
    res.status(500).json({ error: 'Failed to create transaction' })
  }
})

// DELETE a transaction
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Transaction not found' })
    res.json({ message: 'Transaction deleted', id: req.params.id })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete transaction' })
  }
})

module.exports = router
