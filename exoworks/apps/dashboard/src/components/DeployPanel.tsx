import './DeployPanel.css'

interface DeployPanelProps {
  onDeploy: () => void
  isDeploying: boolean
  progress: number
}

export default function DeployPanel({ onDeploy, isDeploying, progress }: DeployPanelProps) {
  return (
    <div className="deploy-panel">
      <button
        className="deploy-button"
        onClick={onDeploy}
        disabled={isDeploying}
      >
        {isDeploying ? 'Deploying...' : 'Deploy Workflow'}
      </button>
      {isDeploying && (
        <div className="deploy-progress">
          <div className="deploy-progress-bar">
            <div
              className="deploy-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="deploy-progress-text">{Math.round(progress)}%</div>
        </div>
      )}
    </div>
  )
}

