import type {
  ExoNode,
  ExoNodeType,
  WalletConfig,
  ConditionConfig,
  SwapConfig,
  DeployTokenConfig,
  SnipeTaskConfig,
} from "./types";

/**
 * Generate a unique node ID
 */
function generateNodeId(type: ExoNodeType): string {
  return `${type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create a wallet node
 */
export function createWalletNode(config: WalletConfig): ExoNode {
  return {
    id: generateNodeId("wallet"),
    type: "wallet",
    label: config.name || `Wallet: ${config.address.slice(0, 8)}...`,
    config: {
      name: config.name,
      address: config.address,
      network: config.network,
    },
  };
}

/**
 * Create a condition node
 */
export function createConditionNode(config: ConditionConfig): ExoNode {
  return {
    id: generateNodeId("condition"),
    type: "condition",
    label: `If ${config.variable} ${config.operator} ${config.threshold}`,
    config: {
      variable: config.variable,
      operator: config.operator,
      threshold: config.threshold,
    },
  };
}

/**
 * Create a swap node
 */
export function createSwapNode(config: SwapConfig): ExoNode {
  return {
    id: generateNodeId("swap"),
    type: "swap",
    label: `Swap ${config.amount} ${config.fromToken} → ${config.toToken}`,
    config: {
      fromToken: config.fromToken,
      toToken: config.toToken,
      amount: config.amount,
    },
  };
}

/**
 * Create a deploy token node
 */
export function createDeployTokenNode(config: DeployTokenConfig): ExoNode {
  return {
    id: generateNodeId("deployToken"),
    type: "deployToken",
    label: `Deploy Token: ${config.ticker}`,
    config: {
      coinName: config.coinName,
      ticker: config.ticker,
      description: config.description,
      imageUrl: config.imageUrl,
      website: config.website,
      xLink: config.xLink,
      telegram: config.telegram,
    },
  };
}

/**
 * Create a snipe task node
 */
export function createSnipeTaskNode(config: SnipeTaskConfig): ExoNode {
  return {
    id: generateNodeId("snipeTask"),
    type: "snipeTask",
    label: `Snipe: ${config.amount} SOL (${config.devBonusPct}% dev bonus)`,
    config: {
      amount: config.amount,
      maxSlippage: config.maxSlippage,
      devBonusPct: config.devBonusPct,
    },
  };
}

/**
 * Create an alert node
 */
export function createAlertNode(message: string): ExoNode {
  return {
    id: generateNodeId("alert"),
    type: "alert",
    label: `Alert: ${message}`,
    config: {
      message,
    },
  };
}

/**
 * Create a mint NFT node
 */
export function createMintNFTNode(metadata: { name: string; uri?: string }): ExoNode {
  return {
    id: generateNodeId("mintNFT"),
    type: "mintNFT",
    label: `Mint NFT: ${metadata.name}`,
    config: {
      name: metadata.name,
      uri: metadata.uri,
    },
  };
}

/**
 * Create a custom node
 */
export function createCustomNode(label: string, config: Record<string, unknown>): ExoNode {
  return {
    id: generateNodeId("custom"),
    type: "custom",
    label,
    config,
  };
}

