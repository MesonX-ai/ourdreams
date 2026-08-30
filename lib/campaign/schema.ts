import { z } from "zod";

/**
 * The Gift Automation builder (ReactFlow) compiles its canvas to a JSON
 * campaign definition. This schema is the contract between the browser
 * builder and the PHP `campaigns.php` endpoint (which re-validates server-side).
 */

export const nodeKindSchema = z.enum([
  "trigger",
  "audience",
  "condition",
  "gift",
  "budget",
  "approval",
  "delay",
  "send",
  "track",
]);

export const graphNodeSchema = z.object({
  id: z.string(),
  kind: nodeKindSchema,
  position: z.object({ x: z.number(), y: z.number() }),
  data: z.record(z.unknown()).default({}),
});

export const graphEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  sourceHandle: z.string().optional(),
  targetHandle: z.string().optional(),
});

export const campaignSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2).max(120),
  nodes: z.array(graphNodeSchema).min(1, "A campaign needs at least one node."),
  edges: z.array(graphEdgeSchema),
  // Optional budget summary computed by the builder's dry-run.
  estimatedRecipients: z.number().optional(),
  estimatedCost: z.number().optional(),
});

export type NodeKind = z.infer<typeof nodeKindSchema>;
export type GraphNode = z.infer<typeof graphNodeSchema>;
export type GraphEdge = z.infer<typeof graphEdgeSchema>;
export type Campaign = z.infer<typeof campaignSchema>;

/**
 * Connection validation: which source kinds may connect to which targets.
 * Enforced both in the builder UI (reject invalid edges) and documented for
 * the PHP endpoint to mirror.
 */
export const CONNECTION_RULES: Record<NodeKind, NodeKind[]> = {
  trigger: ["audience", "condition", "gift"],
  audience: ["condition", "gift", "budget"],
  condition: ["gift", "budget", "send", "delay"],
  gift: ["budget", "approval", "send", "delay"],
  budget: ["approval", "send", "delay"],
  approval: ["send", "delay", "gift"],
  delay: ["send", "gift", "condition"],
  send: ["track"],
  track: [],
};

export function canConnect(source: NodeKind, target: NodeKind): boolean {
  return CONNECTION_RULES[source]?.includes(target) ?? false;
}
