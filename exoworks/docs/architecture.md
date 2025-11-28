# ExoWorks Architecture

This document describes the technical architecture of ExoWorks, including the core SDK components and how the dashboard consumes them.

## Overview

ExoWorks is built as a monorepo with two main packages:

- **@exoworks/sdk**: Core workflow engine and types
- **exoworks-dashboard**: React-based UI application

## Core SDK Architecture

### Types (`types.ts`)

The SDK defines core types for workflows:

- **ExoNodeType**: Enumeration of supported node types
- **ExoNode**: Represents a single node in a workflow with configuration
- **ExoEdge**: Represents a connection between nodes
- **ExoWorkflow**: Complete workflow structure with nodes and edges
- **ExecutionContext**: Runtime context for workflow execution
- **ExecutionLogEntry**: Individual log entries during execution
- **ExecutionResult**: Complete execution result with logs and status

### Workflow Class (`workflow.ts`)

The `Workflow` class provides:

- Node and edge management (add, remove, update)
- Workflow validation
- Graph traversal utilities (entry nodes, exit nodes)
- Type-safe workflow manipulation

### Execution Engine (`executionEngine.ts`)

The `ExecutionEngine` class:

- Executes workflows in topological order
- Handles node dependencies
- Generates execution logs
- Integrates with mock Solana functions for simulation
- Returns detailed execution results

### Node Helpers (`node.ts`)

Helper functions for creating typed node configurations:

- `createWalletNode()`
- `createConditionNode()`
- `createSwapNode()`
- `createDeployTokenNode()`
- `createSnipeTaskNode()`
- And more...

### Mock Solana (`mockSolana.ts`)

Simulated blockchain operations:

- `simulateDeployToken()`: Simulates token deployment
- `simulateSnipeOrder()`: Simulates token sniping
- `simulateSwap()`: Simulates token swaps
- `simulateMintNFT()`: Simulates NFT minting

All functions return fake transaction IDs and logs for UI display.

## Dashboard Architecture

### Component Structure

The dashboard is built with React and organized into:

- **App.tsx**: Main application component managing workflow state
- **TopBar**: Header with logo and status badges
- **Sidebar**: Project/module navigation and node list
- **WorkflowCanvas**: Visual workflow graph display
- **RightPanel**: Deploy controls, transactions, and node configuration
- **ConsolePanel**: Execution logs display
- **TokenDashboard**: Token preview overlay

### State Management

The dashboard uses React hooks for state:

- Workflow instance (from SDK)
- Selected node ID
- Execution state (deploying, progress, logs)
- Transaction list
- UI state (token dashboard visibility)

### Workflow Execution Flow

1. User clicks "Deploy" button
2. Dashboard creates `ExecutionEngine` instance
3. Engine runs workflow with current state
4. Progress bar simulates deployment (60-100%)
5. Logs are streamed to console panel
6. Transactions are extracted from execution results
7. Transaction status updates from pending → confirmed

### Node Configuration

Each node type has a dedicated configuration form:

- Form fields are dynamically rendered based on node type
- Changes update the workflow instance in real-time
- Node labels update automatically based on configuration

## Data Flow

```
User Interaction
    ↓
React Component State Update
    ↓
Workflow Instance Update (SDK)
    ↓
UI Re-render
    ↓
Execution Engine (on Deploy)
    ↓
Mock Solana Functions
    ↓
Execution Logs
    ↓
UI Display (Console, Transactions)
```

## Separation of Concerns

- **SDK**: Pure TypeScript, no UI dependencies
- **Dashboard**: React UI that consumes SDK
- **Mock Functions**: Isolated simulation logic

This separation allows:
- SDK to be used in any JavaScript/TypeScript environment
- Dashboard to be replaced or extended
- Mock functions to be swapped for real implementations

## Extension Points

### Adding New Node Types

1. Add type to `ExoNodeType` in `types.ts`
2. Create helper function in `node.ts`
3. Add execution logic in `executionEngine.ts`
4. Add configuration UI in `NodeConfigPanel.tsx`

### Adding Real Blockchain Integration

Replace mock functions in `mockSolana.ts` with:
- Real Solana web3.js calls
- Wallet connection logic
- Transaction signing and submission
- Real transaction monitoring

## Type Safety

The entire codebase uses TypeScript with strict mode enabled, ensuring:
- Type-safe workflow manipulation
- Compile-time error checking
- IntelliSense support in IDEs
- Refactoring safety

