import './TransactionsPanel.css'

interface Transaction {
  id: string
  type: string
  status: 'pending' | 'confirmed'
  timestamp: Date
}

interface TransactionsPanelProps {
  transactions: Transaction[]
}

export default function TransactionsPanel({ transactions }: TransactionsPanelProps) {
  if (transactions.length === 0) {
    return (
      <div className="transactions-panel">
        <div className="transactions-empty">No transactions yet</div>
      </div>
    )
  }

  return (
    <div className="transactions-panel">
      {transactions.map((tx) => (
        <div key={tx.id} className="transaction-item">
          <div className="transaction-header">
            <span className="transaction-type">{tx.type}</span>
            <span className={`transaction-status ${tx.status}`}>
              {tx.status === 'pending' ? '⏳' : '✓'}
              {tx.status}
            </span>
          </div>
          <div className="transaction-id">{tx.id.slice(0, 16)}...</div>
          <div className="transaction-time">
            {tx.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ))}
    </div>
  )
}

