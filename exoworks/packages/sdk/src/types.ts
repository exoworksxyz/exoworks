/**
 * Core types for ExoWorks SDK
 */

export type ExoNodeType =
  | "wallet"
  | "condition"
  | "swap"
  | "mintNFT"
  | "alert"
  | "deployToken"
  | "snipeTask"
  | "custom";

export interface ExoNodeConfig {
  [key: string]: unknown;
}

export interface ExoNode {
  id: string;
  type: ExoNodeType;
  label: string;
  config: ExoNodeConfig;
  position?: { x: number; y: number };
}

export interface ExoEdge {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
}

export interface ExoWorkflow {
  id: string;
  name: string;
  nodes: ExoNode[];
  edges: ExoEdge[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ExecutionContext {
  workflowId: string;
  variables: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

export interface ExecutionLogEntry {
  timestamp: Date;
  nodeId: string;
  nodeType: ExoNodeType;
  level: "info" | "warning" | "error" | "success";
  message: string;
  data?: unknown;
}

export interface ExecutionResult {
  success: boolean;
  logs: ExecutionLogEntry[];
  finalContext: ExecutionContext;
  error?: Error;
}

export interface DeployTokenConfig {
  coinName: string;
  ticker: string;
  description: string;
  imageUrl?: string;
  website?: string;
  xLink?: string;
  telegram?: string;
}

export interface SnipeTaskConfig {
  amount: number;
  maxSlippage: number;
  devBonusPct: number;
}

export interface SwapConfig {
  fromToken: string;
  toToken: string;
  amount: number;
}

export interface ConditionConfig {
  variable: string;
  operator: "eq" | "ne" | "gt" | "lt" | "gte" | "lte";
  threshold: number | string;
}

export interface WalletConfig {
  name: string;
  address: string;
  network: "mainnet" | "devnet" | "testnet";
}

