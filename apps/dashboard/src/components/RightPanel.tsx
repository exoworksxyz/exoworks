import { ExoNode } from '@exoworks/sdk'
import NodeConfigPanel from './NodeConfigPanel'
import DeployPanel from './DeployPanel'
import TransactionsPanel from './TransactionsPanel'
import './RightPanel.css'

interface RightPanelProps {
  selectedNode: ExoNode | null | undefined
  onNodeUpdate: (nodeId: string, updates: Partial<ExoNode>) => void
  onDeploy: () => void
  isDeploying: boolean
  deployProgress: number
  transactions: Array<{
    id: string
    type: string
    status: 'pending' | 'confirmed'
    timestamp: Date
  }>
  onShowTokenDashboard: (show: boolean) => void
}

export default function RightPanel({
  selectedNode,
  onNodeUpdate,
  onDeploy,
  isDeploying,
  deployProgress,
  transactions,
  onShowTokenDashboard,
}: RightPanelProps) {
  return (
    <div className="right-panel">
      <div className="right-panel-section">
        <div className="right-panel-header">Deploy</div>
        <DeployPanel
          onDeploy={onDeploy}
          isDeploying={isDeploying}
          progress={deployProgress}
        />
      </div>
      <div className="right-panel-section">
        <div className="right-panel-header">Transactions</div>
        <TransactionsPanel transactions={transactions} />
      </div>
      <div className="right-panel-section">
        <div className="right-panel-header">
          {selectedNode ? 'Node Configuration' : 'No Node Selected'}
        </div>
        {selectedNode && (
          <NodeConfigPanel
            node={selectedNode}
            onUpdate={onNodeUpdate}
            onShowTokenDashboard={onShowTokenDashboard}
          />
        )}
      </div>
    </div>
  )
}

