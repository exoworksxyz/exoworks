import { useState, useEffect } from 'react'
import { ExoNode } from '@exoworks/sdk'
import './NodeConfigPanel.css'

interface NodeConfigPanelProps {
  node: ExoNode
  onUpdate: (nodeId: string, updates: Partial<ExoNode>) => void
  onShowTokenDashboard: (show: boolean) => void
}

export default function NodeConfigPanel({ node, onUpdate, onShowTokenDashboard }: NodeConfigPanelProps) {
  const [label, setLabel] = useState(node.label)
  const [config, setConfig] = useState(node.config)

  useEffect(() => {
    setLabel(node.label)
    setConfig(node.config)
  }, [node.id])

  const handleLabelChange = (newLabel: string) => {
    setLabel(newLabel)
    onUpdate(node.id, { label: newLabel })
  }

  const handleConfigChange = (key: string, value: unknown) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    onUpdate(node.id, { config: newConfig })
  }

  const renderConfigFields = () => {
    switch (node.type) {
      case 'wallet':
        return (
          <>
            <div className="config-field">
              <label>Name</label>
              <input
                type="text"
                value={(config as any).name || ''}
                onChange={(e) => handleConfigChange('name', e.target.value)}
                placeholder="Wallet name"
              />
            </div>
            <div className="config-field">
              <label>Address</label>
              <input
                type="text"
                value={(config as any).address || ''}
                onChange={(e) => handleConfigChange('address', e.target.value)}
                placeholder="Wallet address"
              />
            </div>
            <div className="config-field">
              <label>Network</label>
              <select
                value={(config as any).network || 'devnet'}
                onChange={(e) => handleConfigChange('network', e.target.value)}
              >
                <option value="mainnet">Mainnet</option>
                <option value="devnet">Devnet</option>
                <option value="testnet">Testnet</option>
              </select>
            </div>
          </>
        )

      case 'condition':
        return (
          <>
            <div className="config-field">
              <label>Variable</label>
              <input
                type="text"
                value={(config as any).variable || ''}
                onChange={(e) => handleConfigChange('variable', e.target.value)}
                placeholder="Variable name"
              />
            </div>
            <div className="config-field">
              <label>Operator</label>
              <select
                value={(config as any).operator || 'eq'}
                onChange={(e) => handleConfigChange('operator', e.target.value)}
              >
                <option value="eq">Equals (==)</option>
                <option value="ne">Not equals (!=)</option>
                <option value="gt">Greater than (&gt;)</option>
                <option value="lt">Less than (&lt;)</option>
                <option value="gte">Greater or equal (&gt;=)</option>
                <option value="lte">Less or equal (&lt;=)</option>
              </select>
            </div>
            <div className="config-field">
              <label>Threshold</label>
              <input
                type="text"
                value={(config as any).threshold || ''}
                onChange={(e) => handleConfigChange('threshold', e.target.value)}
                placeholder="Threshold value"
              />
            </div>
          </>
        )

      case 'swap':
        return (
          <>
            <div className="config-field">
              <label>From Token</label>
              <input
                type="text"
                value={(config as any).fromToken || ''}
                onChange={(e) => handleConfigChange('fromToken', e.target.value)}
                placeholder="SOL"
              />
            </div>
            <div className="config-field">
              <label>To Token</label>
              <input
                type="text"
                value={(config as any).toToken || ''}
                onChange={(e) => handleConfigChange('toToken', e.target.value)}
                placeholder="USDC"
              />
            </div>
            <div className="config-field">
              <label>Amount</label>
              <input
                type="number"
                value={(config as any).amount || ''}
                onChange={(e) => handleConfigChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="0.0"
              />
            </div>
          </>
        )

      case 'deployToken':
        return (
          <>
            <div className="config-field">
              <label>Coin Name</label>
              <input
                type="text"
                value={(config as any).coinName || ''}
                onChange={(e) => handleConfigChange('coinName', e.target.value)}
                placeholder="My Awesome Token"
              />
            </div>
            <div className="config-field">
              <label>Ticker</label>
              <input
                type="text"
                value={(config as any).ticker || ''}
                onChange={(e) => handleConfigChange('ticker', e.target.value)}
                placeholder="MAT"
              />
            </div>
            <div className="config-field">
              <label>Description</label>
              <textarea
                value={(config as any).description || ''}
                onChange={(e) => handleConfigChange('description', e.target.value)}
                placeholder="Token description"
                rows={3}
              />
            </div>
            <div className="config-field">
              <label>Image URL</label>
              <input
                type="text"
                value={(config as any).imageUrl || ''}
                onChange={(e) => handleConfigChange('imageUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="config-field">
              <label>Website</label>
              <input
                type="text"
                value={(config as any).website || ''}
                onChange={(e) => handleConfigChange('website', e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="config-field">
              <label>X (Twitter)</label>
              <input
                type="text"
                value={(config as any).xLink || ''}
                onChange={(e) => handleConfigChange('xLink', e.target.value)}
                placeholder="@username"
              />
            </div>
            <div className="config-field">
              <label>Telegram</label>
              <input
                type="text"
                value={(config as any).telegram || ''}
                onChange={(e) => handleConfigChange('telegram', e.target.value)}
                placeholder="@channel"
              />
            </div>
            <button
              className="preview-token-button"
              onClick={() => onShowTokenDashboard(true)}
            >
              Preview Token
            </button>
          </>
        )

      case 'snipeTask':
        return (
          <>
            <div className="config-field">
              <label>Amount (SOL)</label>
              <input
                type="number"
                value={(config as any).amount || ''}
                onChange={(e) => handleConfigChange('amount', parseFloat(e.target.value) || 0)}
                placeholder="0.0"
              />
            </div>
            <div className="config-field">
              <label>Max Slippage (%)</label>
              <input
                type="number"
                value={(config as any).maxSlippage || ''}
                onChange={(e) => handleConfigChange('maxSlippage', parseFloat(e.target.value) || 0)}
                placeholder="5.0"
              />
            </div>
            <div className="config-field">
              <label>Dev Bonus (%)</label>
              <input
                type="number"
                value={(config as any).devBonusPct || ''}
                onChange={(e) => handleConfigChange('devBonusPct', parseFloat(e.target.value) || 0)}
                placeholder="5.0"
              />
            </div>
          </>
        )

      default:
        return (
          <div className="config-empty">
            No configuration available for this node type
          </div>
        )
    }
  }

  return (
    <div className="node-config-panel">
      <div className="config-field">
        <label>Node Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          placeholder="Node label"
        />
      </div>
      <div className="config-section">
        <div className="config-section-header">Configuration</div>
        {renderConfigFields()}
      </div>
    </div>
  )
}

