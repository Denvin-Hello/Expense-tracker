import { useEffect, useState, useCallback } from 'react'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { getTransactions, getSummary, createTransaction, deleteTransaction } from './api/transactions'
import styles from './App.module.css'

export default function App() {
  const [transactions, setTransactions] = useState([])
  const [summary, setSummary] = useState({ balance: 0, totalIncome: 0, totalExpense: 0 })
  const [loadingList, setLoadingList] = useState(true)
  const [loadingForm, setLoadingForm] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async () => {
    setLoadingList(true)
    setError(null)
    try {
      const [txs, sum] = await Promise.all([getTransactions(), getSummary()])
      setTransactions(txs)
      setSummary(sum)
    } catch (err) {
      setError('Could not load data. Make sure the server is running.')
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleAdd(data) {
    setLoadingForm(true)
    try {
      const newTx = await createTransaction(data)
      setTransactions(prev => [newTx, ...prev])
      setSummary(prev => {
        const income = data.type === 'income' ? prev.totalIncome + data.amount : prev.totalIncome
        const expense = data.type === 'expense' ? prev.totalExpense + data.amount : prev.totalExpense
        return { totalIncome: income, totalExpense: expense, balance: income - expense }
      })
    } finally {
      setLoadingForm(false)
    }
  }

  async function handleDelete(id) {
    const tx = transactions.find(t => t._id === id)
    if (!tx) return
    setTransactions(prev => prev.filter(t => t._id !== id))
    setSummary(prev => {
      const income = tx.type === 'income' ? prev.totalIncome - tx.amount : prev.totalIncome
      const expense = tx.type === 'expense' ? prev.totalExpense - tx.amount : prev.totalExpense
      return { totalIncome: income, totalExpense: expense, balance: income - expense }
    })
    try {
      await deleteTransaction(id)
    } catch {
      fetchData()
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <i className="ti ti-report-money" aria-hidden="true" />
            <div>
              <h1 className={styles.title}>Expense Tracker</h1>
              <p className={styles.subtitle}>Track your income and expenses</p>
            </div>
          </div>
          <button className={styles.refreshBtn} onClick={fetchData} aria-label="Refresh">
            <i className="ti ti-refresh" aria-hidden="true" />
          </button>
        </header>

        {error && (
          <div className={styles.errorBanner}>
            <i className="ti ti-alert-circle" aria-hidden="true" /> {error}
          </div>
        )}

        <SummaryCards summary={summary} />
        <TransactionForm onAdd={handleAdd} loading={loadingForm} />
        <TransactionList transactions={transactions} onDelete={handleDelete} loading={loadingList} />
      </div>
    </main>
  )
}
