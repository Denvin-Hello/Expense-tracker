import { useState } from 'react'
import styles from './TransactionForm.module.css'

const CATEGORIES = ['Food', 'Transport', 'Housing', 'Entertainment', 'Health', 'Salary', 'Freelance', 'Other']

const today = new Date().toISOString().split('T')[0]

export default function TransactionForm({ onAdd, loading }) {
  const [form, setForm] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: 'Food',
    date: today,
  })
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount || !form.description || !form.date) {
      setError('Please fill in all fields.')
      return
    }
    if (Number(form.amount) <= 0) {
      setError('Amount must be greater than 0.')
      return
    }
    try {
      await onAdd({ ...form, amount: Number(form.amount) })
      setForm(prev => ({ ...prev, amount: '', description: '' }))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <i className="ti ti-plus" aria-hidden="true" /> Add transaction
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Type</label>
            <select name="type" value={form.type} onChange={handleChange} className={styles.input}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Amount (R)</label>
            <input
              name="amount"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={form.amount}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <input
            name="description"
            type="text"
            placeholder="e.g. Grocery run"
            maxLength={100}
            value={form.description}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} className={styles.input}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
        {error && <p className={styles.error}><i className="ti ti-alert-circle" aria-hidden="true" /> {error}</p>}
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <><i className="ti ti-loader-2" aria-hidden="true" /> Saving…</> : 'Add transaction'}
        </button>
      </form>
    </div>
  )
}
