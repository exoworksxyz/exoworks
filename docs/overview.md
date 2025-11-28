# ExoWorks Overview

ExoWorks is a visual workflow engine for building and automating on-chain applications on Solana. It provides a powerful SDK and intuitive dashboard for creating, deploying, and managing automated workflows that interact with the Solana blockchain.

## What is ExoWorks?

ExoWorks enables developers and users to create visual workflows that automate complex on-chain operations. Instead of writing code for each individual transaction, you can design workflows using a node-based interface where each node represents a specific action or condition.

## Key Features

### Visual Workflow Builder
- Drag-and-drop interface for creating workflows
- Support for multiple node types (wallets, conditions, swaps, token deployment, etc.)
- Real-time workflow validation
- Visual representation of workflow execution flow

### Core SDK
The `@exoworks/sdk` package provides:
- **Workflow Management**: Create, validate, and manage workflow structures
- **Execution Engine**: Run workflows with simulated execution
- **Node Types**: Pre-built nodes for common Solana operations
- **Type Safety**: Full TypeScript support with comprehensive type definitions

### Demo Dashboard
The ExoWorks Dashboard is a React-based application that demonstrates:
- Visual workflow editing
- Real-time execution monitoring
- Transaction tracking
- Console logging
- Token deployment preview

## Use Cases

- **Token Deployment**: Automate the process of deploying new tokens on Solana
- **Automated Trading**: Create workflows for automated token swaps and sniping
- **NFT Minting**: Automate NFT creation and distribution
- **Conditional Execution**: Build workflows that respond to on-chain conditions
- **Multi-Step Operations**: Chain together multiple blockchain operations

## Getting Started

1. Install dependencies: `pnpm install`
2. Start the dashboard: `pnpm dev`
3. Explore the SDK: Import `@exoworks/sdk` in your projects

## Architecture

ExoWorks follows a clean separation between:
- **Core SDK**: Workflow logic and execution engine (framework-agnostic)
- **Dashboard UI**: React-based visual interface built on top of the SDK

This architecture allows developers to build their own UIs or integrate ExoWorks workflows into existing applications.

## Example Workflow

A typical workflow might look like:
1. **Wallet Node**: Configure a wallet for operations
2. **Deploy Token Node**: Deploy a new token on Solana
3. **Snipe Task Node**: Automatically purchase the token after deployment
4. **Alert Node**: Notify when the operation completes

See [Workflows](./workflows.md) for detailed examples.

