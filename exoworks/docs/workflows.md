# ExoWorks Workflows

This document provides examples and explanations of ExoWorks workflows.

## Example: Dev Wallet → Deploy Token → Snipe Task

This is a common workflow for token creators who want to automatically purchase their own token after deployment.

### Workflow Structure

```
[Wallet Node] → [Deploy Token Node] → [Snipe Task Node]
```

### Step-by-Step Execution

#### 1. Wallet Node

**Purpose**: Configure the wallet that will be used for all operations.

**Configuration**:
- Name: "Dev Wallet"
- Address: (auto-generated or user-provided)
- Network: Devnet

**Execution**: 
- Node validates wallet configuration
- Logs: "Wallet node configured: Dev Wallet"

#### 2. Deploy Token Node

**Purpose**: Deploy a new token on Solana (simulated).

**Configuration**:
- Coin Name: "My Awesome Token"
- Ticker: "MAT"
- Description: "A token created with ExoWorks"
- Image URL: (optional)
- Website: (optional)
- Social links: (optional)

**Execution**:
- Simulates token deployment process
- Generates fake program ID and transaction ID
- Logs include:
  - "Initializing token deployment for MAT"
  - "Creating token metadata..."
  - "Uploading token image..."
  - "Deploying token program..."
  - "Token deployed successfully!"
  - Program ID and transaction ID

**Result**: 
- Program ID stored in execution context
- Transaction ID logged
- Workflow proceeds to next node

#### 3. Snipe Task Node

**Purpose**: Automatically purchase the newly deployed token.

**Configuration**:
- Amount: 1.0 SOL
- Max Slippage: 5%
- Dev Bonus: 5%

**Execution**:
- Simulates monitoring for token launch
- Executes purchase when token is detected
- Logs include:
  - "Creating snipe order for 1.0 SOL"
  - "Max slippage: 5%"
  - "Dev bonus: 5%"
  - "Monitoring for token launch..."
  - "Token detected, executing snipe..."
  - "Snipe order executed successfully!"
  - Order ID and transaction ID

**Result**:
- Order ID generated
- Transaction ID logged
- Workflow completes

### Complete Execution Log Example

```
[INFO] Executing node: Wallet: Dev Wallet
[INFO] Wallet node configured: Dev Wallet
[INFO] Executing node: Deploy Token: MAT
[INFO] [2024-01-01T12:00:00Z] Initializing token deployment for MAT
[INFO] [2024-01-01T12:00:01Z] Creating token metadata...
[INFO] [2024-01-01T12:00:02Z] Uploading token image...
[INFO] [2024-01-01T12:00:03Z] Deploying token program...
[INFO] [2024-01-01T12:00:04Z] Token deployed successfully!
[SUCCESS] Token deployed: TokenABC123
[INFO] Executing node: Snipe: 1.0 SOL (5% dev bonus)
[INFO] [2024-01-01T12:00:05Z] Creating snipe order for 1.0 SOL
[INFO] [2024-01-01T12:00:06Z] Monitoring for token launch...
[INFO] [2024-01-01T12:00:07Z] Token detected, executing snipe...
[SUCCESS] Snipe order executed: orderXYZ789
```

## Other Workflow Examples

### Conditional Swap Workflow

```
[Wallet] → [Condition: Price > Threshold] → [Swap: SOL → USDC]
```

This workflow checks a condition before executing a swap. If the condition fails, the workflow stops.

### NFT Minting Workflow

```
[Wallet] → [Mint NFT] → [Alert: NFT Minted]
```

A simple workflow that mints an NFT and sends an alert notification.

### Multi-Step Token Launch

```
[Wallet] → [Deploy Token] → [Condition: Token Listed] → [Snipe Task] → [Alert: Complete]
```

A more complex workflow that waits for a condition (token listing) before executing the snipe.

## Workflow Best Practices

1. **Always start with a Wallet Node**: Configure your wallet before any operations
2. **Use Conditions for Safety**: Add condition nodes to prevent unwanted executions
3. **Add Alerts**: Include alert nodes to notify when workflows complete
4. **Validate Before Deploy**: Use the workflow validation feature to check for errors
5. **Test on Devnet**: Always test workflows on devnet before mainnet

## Node Type Reference

- **wallet**: Configure wallet for operations
- **condition**: Evaluate conditions before proceeding
- **swap**: Execute token swaps
- **mintNFT**: Mint NFTs
- **alert**: Send notifications
- **deployToken**: Deploy new tokens
- **snipeTask**: Automatically purchase tokens
- **custom**: Custom node types for extensibility

## Execution Flow

Workflows execute nodes in topological order:

1. Find entry nodes (nodes with no incoming edges)
2. Execute entry nodes
3. For each executed node, execute its outgoing nodes
4. Continue until all nodes are executed
5. Generate execution logs for each step

Dependencies are automatically resolved, so nodes execute only after their dependencies complete.

