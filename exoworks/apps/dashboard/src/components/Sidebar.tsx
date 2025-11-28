import { Workflow, ExoNode } from '@exoworks/sdk'
import './Sidebar.css'

interface SidebarProps {
  workflow: Workflow
  selectedNodeId: string | null
  onNodeSelect: (nodeId: string | null) => void
}

export default function Sidebar({ workflow, selectedNodeId, onNodeSelect }: SidebarProps) {
  const nodeTypes: Record<string, string> = {
    wallet: 'Wallet',
    condition: 'Condition',
    swap: 'Swap',
    mintNFT: 'Mint NFT',
    alert: 'Alert',
    deployToken: 'Deploy Token',
    snipeTask: 'Snipe Task',
    custom: 'Custom',
  }

  const getNodeTypeCount = (type: string) => {
    return workflow.nodes.filter(n => n.type === type).length
  }

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <div className="sidebar-header">Projects</div>
        <div className="sidebar-item active">
          <span className="sidebar-item-icon">📁</span>
          <span>My Workflow</span>
        </div>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-header">Modules</div>
        {Object.entries(nodeTypes).map(([type, label]) => {
          const count = getNodeTypeCount(type)
          return (
            <div
              key={type}
              className={`sidebar-item ${selectedNodeId && workflow.getNode(selectedNodeId)?.type === type ? 'active' : ''}`}
              onClick={() => {
                const node = workflow.nodes.find(n => n.type === type)
                if (node) {
                  onNodeSelect(node.id)
                }
              }}
            >
              <span className="sidebar-item-icon">{getIconForType(type)}</span>
              <span>{label}</span>
              {count > 0 && <span className="sidebar-item-count">{count}</span>}
            </div>
          )
        })}
      </div>
      <div className="sidebar-section">
        <div className="sidebar-header">Nodes</div>
        {workflow.nodes.length === 0 ? (
          <div className="sidebar-empty">No nodes yet</div>
        ) : (
          workflow.nodes.map((node) => (
            <div
              key={node.id}
              className={`sidebar-item ${selectedNodeId === node.id ? 'active' : ''}`}
              onClick={() => onNodeSelect(node.id)}
            >
              <span className="sidebar-item-icon">{getIconForType(node.type)}</span>
              <span className="sidebar-item-label">{node.label}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function getIconForType(type: string): string {
  const icons: Record<string, string> = {
    wallet: '👛',
    condition: '🔀',
    swap: '🔄',
    mintNFT: '🎨',
    alert: '🔔',
    deployToken: '🚀',
    snipeTask: '🎯',
    custom: '⚙️',
  }
  return icons[type] || '⚙️'
}

