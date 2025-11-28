/**
 * @exoworks/sdk
 * Core workflow primitives and execution engine for ExoWorks
 */

// Types
export type {
  ExoNodeType,
  ExoNode,
  ExoEdge,
  ExoWorkflow,
  ExecutionContext,
  ExecutionLogEntry,
  ExecutionResult,
  DeployTokenConfig,
  SnipeTaskConfig,
  SwapConfig,
  ConditionConfig,
  WalletConfig,
  ExoNodeConfig,
} from "./types";

// Core classes
export { Workflow } from "./workflow";
export { ExecutionEngine } from "./executionEngine";

// Node creation helpers
export {
  createWalletNode,
  createConditionNode,
  createSwapNode,
  createDeployTokenNode,
  createSnipeTaskNode,
  createAlertNode,
  createMintNFTNode,
  createCustomNode,
} from "./node";

// Mock Solana helpers
export {
  simulateDeployToken,
  simulateSnipeOrder,
  simulateSwap,
  simulateMintNFT,
  generateFakeAddress,
} from "./mockSolana";

