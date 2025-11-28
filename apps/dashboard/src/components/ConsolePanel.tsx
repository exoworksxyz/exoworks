import { useEffect, useRef } from 'react'
import { ExecutionLogEntry } from '@exoworks/sdk'
import './ConsolePanel.css'

interface ConsolePanelProps {
  logs: ExecutionLogEntry[]
}

export default function ConsolePanel({ logs }: ConsolePanelProps) {
  const logEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const getLogLevelClass = (level: string) => {
    switch (level) {
      case 'error':
        return 'log-error'
      case 'warning':
        return 'log-warning'
      case 'success':
        return 'log-success'
      default:
        return 'log-info'
    }
  }

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      case 'success':
        return '✓'
      default:
        return 'ℹ️'
    }
  }

  return (
    <div className="console-panel">
      <div className="console-header">
        <span className="console-title">Console</span>
        <span className="console-count">{logs.length} logs</span>
      </div>
      <div className="console-content">
        {logs.length === 0 ? (
          <div className="console-empty">No logs yet. Deploy a workflow to see execution logs.</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`console-log ${getLogLevelClass(log.level)}`}>
              <span className="log-icon">{getLogIcon(log.level)}</span>
              <span className="log-time">{log.timestamp.toLocaleTimeString()}</span>
              <span className="log-node">[{log.nodeType}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  )
}

