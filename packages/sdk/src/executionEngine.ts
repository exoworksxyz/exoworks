import type {
  ExoNode,
  ExoNodeType,
  ExecutionContext,
  ExecutionLogEntry,
  ExecutionResult,
  DeployTokenConfig,
  SnipeTaskConfig,
  SwapConfig,
} from "./types";
import { Workflow } from "./workflow";
import {
  simulateDeployToken,
  simulateSnipeOrder,
  simulateSwap,
  simulateMintNFT,
} from "./mockSolana";

/**
 * Execution engine for running workflows
 */
export class ExecutionEngine {
  /**
   * Execute a workflow and return execution logs
   */
  async run(
    workflow: Workflow,
    context: ExecutionContext
  ): Promise<ExecutionResult> {
    const logs: ExecutionLogEntry[] = [];
    const executionContext = { ...context };

    // Validate workflow first
    const validation = workflow.validate();
    if (!validation.valid) {
      return {
        success: false,
        logs: [
          {
            timestamp: new Date(),
            nodeId: "validation",
            nodeType: "custom",
            level: "error",
            message: `Workflow validation failed: ${validation.errors.join(", ")}`,
          },
        ],
        finalContext: executionContext,
        error: new Error(validation.errors.join(", ")),
      };
    }

    try {
      // Find entry nodes (nodes with no incoming edges)
      const entryNodes = workflow.getEntryNodes();

      if (entryNodes.length === 0) {
        logs.push({
          timestamp: new Date(),
          nodeId: "execution",
          nodeType: "custom",
          level: "warning",
          message: "No entry nodes found in workflow",
        });
      }

      // Execute nodes in topological order (simplified: just execute all nodes)
      const executed = new Set<string>();
      const queue: ExoNode[] = [...entryNodes];

      while (queue.length > 0) {
        const node = queue.shift()!;
        if (executed.has(node.id)) continue;

        // Check if all dependencies are executed
        const incomingEdges = workflow.edges.filter((e) => e.targetId === node.id);
        const dependenciesMet = incomingEdges.every((e) => executed.has(e.sourceId));

        if (!dependenciesMet && incomingEdges.length > 0) {
          // Re-queue for later
          queue.push(node);
          continue;
        }

        // Execute the node
        const nodeLogs = await this.executeNode(node, executionContext);
        logs.push(...nodeLogs);
        executed.add(node.id);

        // Add outgoing nodes to queue
        const outgoingEdges = workflow.edges.filter((e) => e.sourceId === node.id);
        for (const edge of outgoingEdges) {
          const targetNode = workflow.getNode(edge.targetId);
          if (targetNode && !executed.has(targetNode.id)) {
            queue.push(targetNode);
          }
        }
      }

      // Execute any remaining nodes that weren't reached
      for (const node of workflow.nodes) {
        if (!executed.has(node.id)) {
          const nodeLogs = await this.executeNode(node, executionContext);
          logs.push(...nodeLogs);
        }
      }

      return {
        success: true,
        logs,
        finalContext: executionContext,
      };
    } catch (error) {
      return {
        success: false,
        logs: [
          ...logs,
          {
            timestamp: new Date(),
            nodeId: "execution",
            nodeType: "custom",
            level: "error",
            message: error instanceof Error ? error.message : "Unknown error occurred",
            data: error,
          },
        ],
        finalContext: executionContext,
        error: error instanceof Error ? error : new Error("Unknown error"),
      };
    }
  }

  /**
   * Execute a single node
   */
  private async executeNode(
    node: ExoNode,
    context: ExecutionContext
  ): Promise<ExecutionLogEntry[]> {
    const logs: ExecutionLogEntry[] = [];

    logs.push({
      timestamp: new Date(),
      nodeId: node.id,
      nodeType: node.type,
      level: "info",
      message: `Executing node: ${node.label}`,
    });

    try {
      switch (node.type) {
        case "wallet":
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "info",
            message: `Wallet node configured: ${(node.config as any).name || "Unnamed"}`,
          });
          break;

        case "condition":
          const conditionResult = this.evaluateCondition(node, context);
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: conditionResult ? "success" : "info",
            message: `Condition evaluated: ${conditionResult ? "PASS" : "FAIL"}`,
          });
          break;

        case "deployToken":
          const deployConfig = node.config as DeployTokenConfig;
          const deployResult = await simulateDeployToken(deployConfig);
          for (const log of deployResult.logs) {
            logs.push({
              timestamp: new Date(),
              nodeId: node.id,
              nodeType: node.type,
              level: "info",
              message: log,
            });
          }
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "success",
            message: `Token deployed: ${deployResult.programId}`,
            data: deployResult,
          });
          break;

        case "snipeTask":
          const snipeConfig = node.config as SnipeTaskConfig;
          const snipeResult = await simulateSnipeOrder(snipeConfig);
          for (const log of snipeResult.logs) {
            logs.push({
              timestamp: new Date(),
              nodeId: node.id,
              nodeType: node.type,
              level: "info",
              message: log,
            });
          }
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "success",
            message: `Snipe order executed: ${snipeResult.orderId}`,
            data: snipeResult,
          });
          break;

        case "swap":
          const swapConfig = node.config as SwapConfig;
          const swapResult = await simulateSwap(swapConfig);
          for (const log of swapResult.logs) {
            logs.push({
              timestamp: new Date(),
              nodeId: node.id,
              nodeType: node.type,
              level: "info",
              message: log,
            });
          }
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "success",
            message: `Swap completed: ${swapResult.transactionId}`,
            data: swapResult,
          });
          break;

        case "mintNFT":
          const mintResult = await simulateMintNFT(node.config as { name: string; uri?: string });
          for (const log of mintResult.logs) {
            logs.push({
              timestamp: new Date(),
              nodeId: node.id,
              nodeType: node.type,
              level: "info",
              message: log,
            });
          }
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "success",
            message: `NFT minted: ${mintResult.mintAddress}`,
            data: mintResult,
          });
          break;

        case "alert":
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "warning",
            message: `Alert: ${(node.config as any).message || "No message"}`,
          });
          break;

        case "custom":
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "info",
            message: `Custom node executed: ${node.label}`,
          });
          break;

        default:
          logs.push({
            timestamp: new Date(),
            nodeId: node.id,
            nodeType: node.type,
            level: "warning",
            message: `Unknown node type: ${node.type}`,
          });
      }
    } catch (error) {
      logs.push({
        timestamp: new Date(),
        nodeId: node.id,
        nodeType: node.type,
        level: "error",
        message: `Error executing node: ${error instanceof Error ? error.message : "Unknown error"}`,
        data: error,
      });
    }

    return logs;
  }

  /**
   * Evaluate a condition node
   */
  private evaluateCondition(node: ExoNode, context: ExecutionContext): boolean {
    const config = node.config as { variable: string; operator: string; threshold: number | string };
    const value = context.variables[config.variable];

    if (value === undefined) {
      return false;
    }

    switch (config.operator) {
      case "eq":
        return value === config.threshold;
      case "ne":
        return value !== config.threshold;
      case "gt":
        return Number(value) > Number(config.threshold);
      case "lt":
        return Number(value) < Number(config.threshold);
      case "gte":
        return Number(value) >= Number(config.threshold);
      case "lte":
        return Number(value) <= Number(config.threshold);
      default:
        return false;
    }
  }
}

