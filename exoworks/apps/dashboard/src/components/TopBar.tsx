import './TopBar.css'

interface TopBarProps {
  workflowName: string
}

export default function TopBar({ workflowName }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">ExoWorks</span>
        </div>
        <div className="workspace-name">{workflowName}</div>
      </div>
      <div className="top-bar-right">
        <div className="status-badge status-online">
          <span className="status-dot"></span>
          Online
        </div>
        <div className="status-badge status-devnet">
          <span className="status-dot"></span>
          Devnet
        </div>
      </div>
    </div>
  )
}

