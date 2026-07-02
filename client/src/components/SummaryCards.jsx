import styles from './SummaryCards.module.css'

function fmt(n) {
  return 'R ' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function SummaryCards({ summary }) {
  const { balance = 0, totalIncome = 0, totalExpense = 0 } = summary

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.label}><i className="ti ti-wallet" aria-hidden="true" /> Balance</div>
        <div className={`${styles.value} ${balance >= 0 ? styles.positive : styles.negative}`}>
          {fmt(balance)}
        </div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}><i className="ti ti-arrow-down-circle" aria-hidden="true" /> Total income</div>
        <div className={`${styles.value} ${styles.income}`}>{fmt(totalIncome)}</div>
      </div>
      <div className={styles.card}>
        <div className={styles.label}><i className="ti ti-arrow-up-circle" aria-hidden="true" /> Total expenses</div>
        <div className={`${styles.value} ${styles.expense}`}>{fmt(totalExpense)}</div>
      </div>
    </div>
  )
}
