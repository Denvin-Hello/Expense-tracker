# Expense Tracker

A full-stack expense tracking app built with React, Node.js/Express, and MongoDB. Add income and expense transactions, view your balance summary, and delete entries — all persisted to a real database.

## Features

- Add income and expense transactions with category, description, and date
- Live balance, total income, and total expenses summary cards
- Transaction list sorted by date (newest first)
- Delete transactions with optimistic UI updates
- REST API with validation and error handling
- Light and dark mode (follows system preference)

## Tech Stack

**Frontend**
- React 18, Vite, CSS Modules

**Backend**
- Node.js, Express.js
- MongoDB with Mongoose ODM
- REST API (GET, POST, DELETE)

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

### 1. Clone and install all dependencies

```bash
git clone https://github.com/Denvin-Hello/expense-tracker.git
cd expense-tracker
npm run install:all
```

### 2. Configure the server

```bash
cd server
cp .env.example .env
```

Edit `.env` and set your MongoDB URI:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
CLIENT_URL=http://localhost:5173
```

### 3. Run the app

From the root directory:
```bash
npm run dev
```

This starts both the Express server (port 5000) and the React dev server (port 5173) concurrently.

Open [http://localhost:5173](http://localhost:5173).

### Troubleshooting

- If the app shows "Could not load data. Make sure the server is running," the server is likely unable to connect to MongoDB.
- Make sure MongoDB is installed and running locally:
  - On Windows, start the MongoDB service or run `mongod`.
  - If using MongoDB Atlas, set `MONGO_URI` in `server/.env` to your Atlas connection string.
- Confirm the server starts successfully before using the frontend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| GET | `/api/transactions/summary` | Get balance summary |
| POST | `/api/transactions` | Create a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |

## Project Structure

```
expense-tracker/
├── client/               # React frontend (Vite)
│   └── src/
│       ├── api/          # API utility functions
│       ├── components/   # SummaryCards, TransactionForm, TransactionList
│       ├── App.jsx
│       └── index.css
├── server/               # Express backend
│   ├── models/           # Mongoose Transaction model
│   ├── routes/           # Express route handlers
│   ├── index.js          # Server entry point
│   └── .env.example
└── package.json          # Root scripts (concurrently)
```

## License

MIT
