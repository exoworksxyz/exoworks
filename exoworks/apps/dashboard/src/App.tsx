import { useState, useCallback } from 'react'
import { 
  Workflow, 
  ExecutionEngine, 
  ExecutionContext, 
  ExecutionLogEntry, 
  ExoNode,
  createWalletNode,
  createDeployTokenNode,
  createSnipeTaskNode,
  generateFakeAddress
} from '@exoworks/sdk'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import WorkflowCanvas from './components/WorkflowCanvas'
import RightPanel from './components/RightPanel'
import ConsolePanel from './components/ConsolePanel'
import TokenDashboard from './components/TokenDashboard'
import './App.css'

function App() {
  const [workflow, setWorkflow] = useState<Workflow>(() => {
    const wf = new Workflow('workflow-1', 'My Workflow')
    
    // Initialize with sample nodes
    const walletNode = createWalletNode({
      name: 'Dev Wallet',
      address: generateFakeAddress(),
      network: 'devnet'
    })
    walletNode.position = { x: 200, y: 100 }
    
    const deployNode = createDeployTokenNode({
      coinName: 'My Awesome Token',
      ticker: 'MAT',
      description: 'A token created with ExoWorks',
      imageUrl: '',
      website: '',
      xLink: '',
      telegram: ''
    })
    deployNode.position = { x: 500, y: 100 }
    
    const snipeNode = createSnipeTaskNode({
      amount: 1.0,
      maxSlippage: 5.0,
      devBonusPct: 5.0
    })
    snipeNode.position = { x: 800, y: 100 }
    
    wf.addNode(walletNode)
    wf.addNode(deployNode)
    wf.addNode(snipeNode)
    
    // Add edges
    wf.addEdge({
      id: 'edge-1',
      sourceId: walletNode.id,
      targetId: deployNode.id
    })
    wf.addEdge({
      id: 'edge-2',
      sourceId: deployNode.id,
      targetId: snipeNode.id
    })
    
    return wf
  })
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [logs, setLogs] = useState<ExecutionLogEntry[]>([])
  const [transactions, setTransactions] = useState<Array<{
    id: string
    type: string
    status: 'pending' | 'confirmed'
    timestamp: Date
  }>>([])
  const [showTokenDashboard, setShowTokenDashboard] = useState(false)

  const selectedNode = selectedNodeId ? workflow.getNode(selectedNodeId) : null

  const updateNode = useCallback((nodeId: string, updates: Partial<ExoNode>) => {
    setWorkflow(prev => {
      const updated = new Workflow(prev.id, prev.name)
      updated.nodes = prev.nodes.map(n => n.id === nodeId ? { ...n, ...updates } : n)
      updated.edges = [...prev.edges]
      updated.createdAt = prev.createdAt
      updated.updatedAt = new Date()
      return updated
    })
  }, [])

  const handleDeploy = async () => {
    if (isDeploying) return

    setIsDeploying(true)
    setDeployProgress(0)
    setLogs([])
    setTransactions([])

    // Simulate progress
    const progressInterval = setInterval(() => {
      setDeployProgress(prev => {
        if (prev >= 60) {
          clearInterval(progressInterval)
          return prev
        }
        return prev + Math.random() * 5
      })
    }, 500)

    const context: ExecutionContext = {
      workflowId: workflow.id,
      variables: {},
    }

    const engine = new ExecutionEngine()
    const result = await engine.run(workflow, context)

    // Complete progress
    clearInterval(progressInterval)
    setDeployProgress(100)

    // Add logs
    setLogs(result.logs)

    // Extract transactions from logs
    const newTransactions: Array<{
      id: string
      type: string
      status: 'pending' | 'confirmed'
      timestamp: Date
    }> = []

    result.logs.forEach(log => {
      if (log.data && typeof log.data === 'object') {
        const data = log.data as any
        if (data.transactionId) {
          newTransactions.push({
            id: data.transactionId,
            type: log.nodeType,
            status: 'pending',
            timestamp: log.timestamp,
          })
        }
        if (data.programId) {
          newTransactions.push({
            id: data.programId,
            type: 'deploy',
            status: 'pending',
            timestamp: log.timestamp,
          })
        }
      }
    })

    setTransactions(newTransactions)

    // Simulate transaction confirmations
    setTimeout(() => {
      setTransactions(prev => prev.map(tx => ({ ...tx, status: 'confirmed' as const })))
    }, 2000)

    setTimeout(() => {
      setIsDeploying(false)
    }, 1000)
  }

  return (
    <div className="app">
      <TopBar workflowName={workflow.name} />
      <div className="app-content">
        <Sidebar workflow={workflow} onNodeSelect={setSelectedNodeId} selectedNodeId={selectedNodeId} />
        <div className="main-area">
          <WorkflowCanvas
            workflow={workflow}
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
            onNodeUpdate={updateNode}
          />
          <RightPanel
            selectedNode={selectedNode}
            onNodeUpdate={updateNode}
            onDeploy={handleDeploy}
            isDeploying={isDeploying}
            deployProgress={deployProgress}
            transactions={transactions}
            onShowTokenDashboard={setShowTokenDashboard}
          />
        </div>
        <ConsolePanel logs={logs} />
      </div>
      {showTokenDashboard && selectedNode?.type === 'deployToken' && (
        <TokenDashboard
          node={selectedNode}
          onClose={() => setShowTokenDashboard(false)}
        />
      )}
    </div>
  )
}

export default App

