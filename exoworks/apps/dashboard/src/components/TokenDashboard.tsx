import { ExoNode } from '@exoworks/sdk'
import './TokenDashboard.css'

interface TokenDashboardProps {
  node: ExoNode
  onClose: () => void
}

export default function TokenDashboard({ node, onClose }: TokenDashboardProps) {
  const config = node.config as {
    coinName?: string
    ticker?: string
    description?: string
    imageUrl?: string
    website?: string
    xLink?: string
    telegram?: string
  }

  return (
    <div className="token-dashboard-overlay" onClick={onClose}>
      <div className="token-dashboard" onClick={(e) => e.stopPropagation()}>
        <div className="token-dashboard-header">
          <h2>Token Dashboard</h2>
          <button className="token-dashboard-close" onClick={onClose}>×</button>
        </div>
        <div className="token-dashboard-content">
          {config.imageUrl && (
            <div className="token-image">
              <img src={config.imageUrl} alt={config.coinName || 'Token'} />
            </div>
          )}
          <div className="token-info">
            <h1 className="token-name">{config.coinName || 'Unnamed Token'}</h1>
            <div className="token-ticker">{config.ticker || 'TICKER'}</div>
            {config.description && (
              <div className="token-description">{config.description}</div>
            )}
            <div className="token-socials">
              {config.website && (
                <a href={config.website} target="_blank" rel="noopener noreferrer" className="social-link">
                  🌐 Website
                </a>
              )}
              {config.xLink && (
                <a href={`https://x.com/${config.xLink.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  𝕏 Twitter
                </a>
              )}
              {config.telegram && (
                <a href={`https://t.me/${config.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  💬 Telegram
                </a>
              )}
            </div>
            <div className="token-stats">
              <div className="token-stat">
                <div className="stat-label">Status</div>
                <div className="stat-value">Deployed</div>
              </div>
              <div className="token-stat">
                <div className="stat-label">Network</div>
                <div className="stat-value">Solana Devnet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

