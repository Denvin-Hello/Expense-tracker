const BASE = '/api/transactions'

export async function getTransactions(filters = {}) {
  const params = new URLSearchParams(filters)
  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error('Failed to fetch transactions')
  return res.json()
}

export async function getSummary() {
  const res = await fetch(`${BASE}/summary`)
  if (!res.ok) throw new Error('Failed to fetch summary')
  return res.json()
}

export async function createTransaction(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create transaction')
  }
  return res.json()
}

export async function deleteTransaction(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete transaction')
  return res.json()
}
