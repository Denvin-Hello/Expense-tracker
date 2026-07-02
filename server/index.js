require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const transactionRoutes = require('./routes/transactions')

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker'

if (!MONGO_URI) {
  console.error('Missing MONGO_URI. Please add a valid MongoDB connection string to server/.env or environment variables.')
  process.exit(1)
}

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/transactions', transactionRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('MongoDB connection error:')
    console.error(err)
    process.exit(1)
  })
