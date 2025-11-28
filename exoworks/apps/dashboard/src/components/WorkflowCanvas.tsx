import { Workflow, ExoNode, ExoEdge } from '@exoworks/sdk'
import './WorkflowCanvas.css'

interface WorkflowCanvasProps {
  workflow: Workflow
  selectedNodeId: string | null
  onNodeSelect: (nodeId: string | null) => void
  onNodeUpdate: (nodeId: string, updates: Partial<ExoNode>) => void
}

export default function WorkflowCanvas({
  workflow,
  selectedNodeId,
  onNodeSelect,
  onNodeUpdate,
}: WorkflowCanvasProps) {
  const getNodeColor = (type: string) => {
    const colors: Record<string, string> = {
      wallet: '#60a5fa',
      condition: '#a78bfa',
      swap: '#34d399',
      mintNFT: '#f472b6',
      alert: '#fbbf24',
      deployToken: '#fb7185',
      snipeTask: '#f87171',
      custom: '#94a3b8',
    }
    return colors[type] || '#94a3b8'
  }

  const getNodeIcon = (type: string) => {
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

  // Simple layout: arrange nodes in a grid
  const getNodePosition = (index: number) => {
    const cols = Math.ceil(Math.sqrt(workflow.nodes.length))
    const row = Math.floor(index / cols)
    const col = index % cols
    return {
      x: 200 + col * 250,
      y: 100 + row * 150,
    }
  }

  return (
    <div className="workflow-canvas" onClick={(e) => {
      if (e.target === e.currentTarget) {
        onNodeSelect(null)
      }
    }}>
      {workflow.nodes.length === 0 ? (
        <div className="canvas-empty">
          <div className="canvas-empty-icon">⚡</div>
          <div className="canvas-empty-text">No nodes in workflow</div>
          <div className="canvas-empty-hint">Select a node from the sidebar or add one via the right panel</div>
        </div>
      ) : (
        <>
          {/* Render edges */}
          <svg className="canvas-edges" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {workflow.edges.map((edge) => {
              const sourceNode = workflow.getNode(edge.sourceId)
              const targetNode = workflow.getNode(edge.targetId)
              if (!sourceNode || !targetNode) return null

              const sourcePos = sourceNode.position || getNodePosition(workflow.nodes.indexOf(sourceNode))
              const targetPos = targetNode.position || getNodePosition(workflow.nodes.indexOf(targetNode))

              const x1 = sourcePos.x + 100
              const y1 = sourcePos.y + 40
              const x2 = targetPos.x + 100
              const y2 = targetPos.y + 40

              return (
                <line
                  key={edge.id}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#4a5568"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              )
            })}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#4a5568" />
              </marker>
            </defs>
          </svg>

          {/* Render nodes */}
          {workflow.nodes.map((node, index) => {
            const position = node.position || getNodePosition(index)
            const isSelected = selectedNodeId === node.id
            const color = getNodeColor(node.type)

            return (
              <div
                key={node.id}
                className={`workflow-node ${isSelected ? 'selected' : ''}`}
                style={{
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  borderColor: isSelected ? color : '#2a2a2a',
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onNodeSelect(node.id)
                }}
              >
                <div className="node-header" style={{ backgroundColor: color + '20' }}>
                  <span className="node-icon">{getNodeIcon(node.type)}</span>
                  <span className="node-type">{node.type}</span>
                </div>
                <div className="node-label">{node.label}</div>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

