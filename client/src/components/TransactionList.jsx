import styles from './TransactionList.module.css'

const CAT_ICONS = {
  Food: 'ti-fork', Transport: 'ti-car', Housing: 'ti-home',
  Entertainment: 'ti-device-tv', Health: 'ti-heart',
  Salary: 'ti-briefcase', Freelance: 'ti-code', Other: 'ti-dots',
}

function fmt(n) {
  return 'R ' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

export default function TransactionList({ transactions, onDelete, loading }) {
  if (loading) {
    return (
      <div className={styles.panel}>
        <div className={styles.panelHead}><span>Transactions</span></div>
        <div className={styles.empty}><i className="ti ti-loader-2" aria-hidden="true" /> Loading…</div>
      </div>
    )
  }

  return (
    <div className={styles.panel}>
      <div className={styles.panelHead}>
        <span><i className="ti ti-list" aria-hidden="true" /> Transactions</span>
        <span className={styles.count}>{transactions.length} entr{transactions.length === 1 ? 'y' : 'ies'}</span>
      </div>

      {transactions.length === 0 ? (
        <div className={styles.empty}>
          <i className="ti ti-receipt-off" aria-hidden="true" />
          <p>No transactions yet. Add one above.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {transactions.map(tx => (
            <li key={tx._id} className={styles.item}>
              <div className={`${styles.icon} ${styles[tx.type]}`}>
                <i className={`ti ${CAT_ICONS[tx.category] || 'ti-dots'}`} aria-hidden="true" />
              </div>
              <div className={styles.info}>
                <span className={styles.desc}>{tx.description}</span>
                <span className={styles.meta}>{tx.category} · {formatDate(tx.date)}</span>
              </div>
              <span className={`${styles.amount} ${styles[tx.type]}`}>
                {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
              </span>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(tx._id)}
                aria-label={`Delete ${tx.description}`}
              >
                <i className="ti ti-trash" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
