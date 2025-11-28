import type {
  ExoNode,
  ExoEdge,
  ExoWorkflow,
} from "./types";

/**
 * Workflow class for managing nodes and edges
 */
export class Workflow implements ExoWorkflow {
  public id: string;
  public name: string;
  public nodes: ExoNode[];
  public edges: ExoEdge[];
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.nodes = [];
    this.edges = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Add a node to the workflow
   */
  addNode(node: ExoNode): void {
    if (this.nodes.find((n) => n.id === node.id)) {
      throw new Error(`Node with id ${node.id} already exists`);
    }
    this.nodes.push(node);
    this.updatedAt = new Date();
  }

  /**
   * Remove a node and all connected edges
   */
  removeNode(nodeId: string): void {
    this.nodes = this.nodes.filter((n) => n.id !== nodeId);
    this.edges = this.edges.filter(
      (e) => e.sourceId !== nodeId && e.targetId !== nodeId
    );
    this.updatedAt = new Date();
  }

  /**
   * Add an edge between two nodes
   */
  addEdge(edge: ExoEdge): void {
    const sourceExists = this.nodes.some((n) => n.id === edge.sourceId);
    const targetExists = this.nodes.some((n) => n.id === edge.targetId);

    if (!sourceExists || !targetExists) {
      throw new Error(
        `Edge references non-existent nodes: ${edge.sourceId} -> ${edge.targetId}`
      );
    }

    if (this.edges.find((e) => e.id === edge.id)) {
      throw new Error(`Edge with id ${edge.id} already exists`);
    }

    this.edges.push(edge);
    this.updatedAt = new Date();
  }

  /**
   * Remove an edge
   */
  removeEdge(edgeId: string): void {
    this.edges = this.edges.filter((e) => e.id !== edgeId);
    this.updatedAt = new Date();
  }

  /**
   * Get a node by ID
   */
  getNode(nodeId: string): ExoNode | undefined {
    return this.nodes.find((n) => n.id === nodeId);
  }

  /**
   * Update a node's configuration
   */
  updateNode(nodeId: string, updates: Partial<ExoNode>): void {
    const node = this.getNode(nodeId);
    if (!node) {
      throw new Error(`Node with id ${nodeId} not found`);
    }
    Object.assign(node, updates);
    this.updatedAt = new Date();
  }

  /**
   * Validate the workflow structure
   */
  validate(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check for duplicate node IDs
    const nodeIds = new Set<string>();
    for (const node of this.nodes) {
      if (nodeIds.has(node.id)) {
        errors.push(`Duplicate node ID: ${node.id}`);
      }
      nodeIds.add(node.id);
    }

    // Check for duplicate edge IDs
    const edgeIds = new Set<string>();
    for (const edge of this.edges) {
      if (edgeIds.has(edge.id)) {
        errors.push(`Duplicate edge ID: ${edge.id}`);
      }
      edgeIds.add(edge.id);
    }

    // Check edges reference valid nodes
    for (const edge of this.edges) {
      if (!this.nodes.some((n) => n.id === edge.sourceId)) {
        errors.push(`Edge ${edge.id} references non-existent source node: ${edge.sourceId}`);
      }
      if (!this.nodes.some((n) => n.id === edge.targetId)) {
        errors.push(`Edge ${edge.id} references non-existent target node: ${edge.targetId}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get nodes that have no incoming edges (entry points)
   */
  getEntryNodes(): ExoNode[] {
    const targetIds = new Set(this.edges.map((e) => e.targetId));
    return this.nodes.filter((n) => !targetIds.has(n.id));
  }

  /**
   * Get nodes that have no outgoing edges (exit points)
   */
  getExitNodes(): ExoNode[] {
    const sourceIds = new Set(this.edges.map((e) => e.sourceId));
    return this.nodes.filter((n) => !sourceIds.has(n.id));
  }
}

