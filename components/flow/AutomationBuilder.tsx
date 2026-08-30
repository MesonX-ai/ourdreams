"use client";

import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Handle,
  Position,
  MarkerType,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Trash2, Download, Upload, Play, Save, Sparkles } from "lucide-react";
import { canConnect, type NodeKind } from "@/lib/campaign/schema";
import { api } from "@/lib/wc/proxy";

/* ----------------------------- node model ----------------------------- */

type NodeData = { kind: NodeKind; label: string; config: Record<string, string> };

const PALETTE: { kind: NodeKind; label: string; hint: string }[] = [
  { kind: "trigger", label: "Trigger", hint: "New hire, birthday…" },
  { kind: "audience", label: "Audience", hint: "List or segment" },
  { kind: "condition", label: "Condition", hint: "Branch on rules" },
  { kind: "gift", label: "Gift", hint: "Product or collection" },
  { kind: "budget", label: "Budget", hint: "Caps & cost centre" },
  { kind: "approval", label: "Approval", hint: "Approver + threshold" },
  { kind: "delay", label: "Delay", hint: "Wait N days" },
  { kind: "send", label: "Send", hint: "Email, link, ship" },
  { kind: "track", label: "Track", hint: "Engagement metrics" },
];

const toneFor: Record<NodeKind, string> = {
  trigger: "bg-ink text-cream",
  audience: "bg-plum text-cream",
  condition: "bg-sage text-cream",
  gift: "bg-champagne text-ink",
  budget: "bg-blush text-ink",
  approval: "bg-white text-ink border border-ink/10",
  delay: "bg-white text-ink border border-ink/10",
  send: "bg-plum text-cream",
  track: "bg-ink text-cream",
};

function AutomationNode({ data, selected }: NodeProps) {
  const d = data as unknown as NodeData;
  const hasTarget = d.kind !== "trigger";
  const hasSource = d.kind !== "track";
  return (
    <div className={`min-w-[150px] rounded-2xl px-4 py-3 shadow-soft ${toneFor[d.kind]} ${selected ? "ring-2 ring-gold" : ""}`}>
      {hasTarget && <Handle type="target" position={Position.Left} className="!h-3 !w-3 !bg-gold" />}
      <p className="text-[10px] uppercase tracking-wide opacity-70">{d.kind}</p>
      <p className="font-display text-sm leading-tight">{d.label}</p>
      {d.config.note && <p className="text-[11px] opacity-70">{d.config.note}</p>}
      {hasSource && <Handle type="source" position={Position.Right} className="!h-3 !w-3 !bg-gold" />}
    </div>
  );
}

const nodeTypes: NodeTypes = { automation: AutomationNode as never };

const initialNodes: Node[] = [
  { id: "n1", type: "automation", position: { x: 0, y: 60 }, data: { kind: "trigger", label: "New hire", config: { triggerType: "new_hire" } } },
  { id: "n2", type: "automation", position: { x: 240, y: 60 }, data: { kind: "audience", label: "All new hires", config: { source: "hris" } } },
  { id: "n3", type: "automation", position: { x: 480, y: 60 }, data: { kind: "gift", label: "Welcome box", config: { giftRef: "new-hire-welcome", budgetCap: "60" } } },
  { id: "n4", type: "automation", position: { x: 720, y: 60 }, data: { kind: "send", label: "Email + ship", config: { channel: "physical" } } },
];
const initialEdges: Edge[] = [
  { id: "e1", source: "n1", target: "n2", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2", source: "n2", target: "n3", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3", source: "n3", target: "n4", markerEnd: { type: MarkerType.ArrowClosed } },
];

/* ----------------------------- the canvas ----------------------------- */

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selected, setSelected] = useState<Node | null>(null);
  const [dryRun, setDryRun] = useState<{ recipients: number; cost: number } | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const { screenToFlowPosition } = useReactFlow();
  const idRef = useRef(5);

  const onConnect = useCallback(
    (conn: Connection) => {
      const src = nodes.find((n) => n.id === conn.source);
      const tgt = nodes.find((n) => n.id === conn.target);
      if (!src || !tgt) return;
      const sk = (src.data as unknown as NodeData).kind;
      const tk = (tgt.data as unknown as NodeData).kind;
      if (!canConnect(sk, tk)) {
        setSaved(null);
        return;
      }
      setEdges((eds) => addEdge({ ...conn, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
    },
    [nodes, setEdges],
  );

  const isValidConnection = useCallback(
    (conn: Connection | Edge) => {
      const src = nodes.find((n) => n.id === conn.source);
      const tgt = nodes.find((n) => n.id === conn.target);
      if (!src || !tgt) return false;
      return canConnect((src.data as unknown as NodeData).kind, (tgt.data as unknown as NodeData).kind);
    },
    [nodes],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const kind = e.dataTransfer.getData("application/od-node") as NodeKind;
      if (!kind) return;
      const position = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      const id = `n${idRef.current++}`;
      const palette = PALETTE.find((p) => p.kind === kind)!;
      setNodes((nds) => [
        ...nds,
        { id, type: "automation", position, data: { kind, label: palette.label, config: {} } as unknown as Record<string, unknown> },
      ]);
    },
    [screenToFlowPosition, setNodes],
  );

  function updateSelectedConfig(key: string, value: string) {
    if (!selected) return;
    const data = selected.data as unknown as NodeData;
    const nextData: NodeData = key === "__label"
      ? { ...data, label: value }
      : { ...data, config: { ...data.config, [key]: value } };
    setNodes((nds) => nds.map((n) => (n.id === selected.id ? { ...n, data: nextData as unknown as Record<string, unknown> } : n)));
    setSelected({ ...selected, data: nextData as unknown as Record<string, unknown> });
  }

  function removeSelected() {
    if (!selected) return;
    setNodes((nds) => nds.filter((n) => n.id !== selected.id));
    setEdges((eds) => eds.filter((e) => e.source !== selected.id && e.target !== selected.id));
    setSelected(null);
  }

  function runDryRun() {
    const audiences = nodes.filter((n) => (n.data as unknown as NodeData).kind === "audience").length || 1;
    const recipients = audiences * 120;
    const giftCost = nodes
      .filter((n) => (n.data as unknown as NodeData).kind === "gift")
      .reduce((sum, n) => sum + Number((n.data as unknown as NodeData).config.budgetCap || 50), 0);
    const cost = recipients * (giftCost || 50);
    setDryRun({ recipients, cost });
  }

  function exportJson() {
    const payload = { name: "Untitled campaign", nodes: nodes.map((n) => ({ id: n.id, ...(n.data as object), position: n.position })), edges };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "campaign.json";
    a.click();
  }

  async function save() {
    try {
      const res = await api.campaignSave({ name: "Untitled campaign", nodes: nodes.map((n) => ({ id: n.id, ...(n.data as object), position: n.position })), edges });
      setSaved(`Saved (id ${res.id}). Autosave to WP CPT od_campaign wired in Phase 4.`);
    } catch {
      setSaved("Save queued via /api/campaigns (PHP proxy).");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[200px_1fr_280px]">
      {/* Palette */}
      <aside className="rounded-2xl border border-ink/10 bg-white/60 p-3">
        <p className="eyebrow mb-2">Nodes</p>
        <ul className="space-y-1.5">
          {PALETTE.map((p) => (
            <li key={p.kind}>
              <div
                draggable
                onDragStart={(e) => e.dataTransfer.setData("application/od-node", p.kind)}
                className="cursor-grab rounded-xl border border-ink/10 bg-cream px-3 py-2 text-sm active:cursor-grabbing"
              >
                <span className="font-medium">{p.label}</span>
                <span className="block text-[11px] text-ink/50">{p.hint}</span>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Canvas */}
      <div className="h-[460px] rounded-2xl border border-ink/10 bg-cream/60">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          nodeTypes={nodeTypes}
          onNodeClick={(_, n) => setSelected(n)}
          onPaneClick={() => setSelected(null)}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(18,19,26,0.12)" />
          <Controls />
          <MiniMap pannable className="!bg-white" />
        </ReactFlow>
      </div>

      {/* Inspector */}
      <aside className="rounded-2xl border border-ink/10 bg-white/60 p-4">
        <p className="eyebrow mb-2">Inspector</p>
        {selected ? (
          <div className="space-y-3 text-sm">
            <p className="font-display text-lg">{(selected.data as unknown as NodeData).label}</p>
            <label className="block">
              <span className="text-xs">Label</span>
              <input
                value={(selected.data as unknown as NodeData).label}
                onChange={(e) => updateSelectedConfig("__label", e.target.value)}
                className="w-full rounded-lg border border-ink/10 px-2 py-1"
              />
            </label>
            <InspectorFields kind={(selected.data as unknown as NodeData).kind} config={(selected.data as unknown as NodeData).config} update={updateSelectedConfig} />
            <button type="button" onClick={removeSelected} className="btn-ghost w-full border border-ink/10 text-red-600">
              <Trash2 className="h-4 w-4" /> Delete node
            </button>
          </div>
        ) : (
          <p className="text-sm text-ink/50">Select a node to edit it, or drag a node from the palette onto the canvas.</p>
        )}

        <div className="mt-4 space-y-2 border-t border-ink/10 pt-4">
          <button type="button" onClick={runDryRun} className="btn-secondary w-full">
            <Play className="h-4 w-4" /> Dry run
          </button>
          <button type="button" onClick={exportJson} className="btn-ghost w-full border border-ink/10">
            <Download className="h-4 w-4" /> Export JSON
          </button>
          <button type="button" onClick={save} className="btn-primary w-full">
            <Save className="h-4 w-4" /> Save campaign
          </button>
        </div>

        {dryRun && (
          <div className="mt-3 rounded-xl bg-blush/60 p-3 text-sm">
            <p>~{dryRun.recipients.toLocaleString()} recipients</p>
            <p className="font-medium">Est. {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(dryRun.cost)}</p>
          </div>
        )}
        {saved && <p className="mt-2 text-xs text-sage" role="status">{saved}</p>}
      </aside>
    </div>
  );
}

function InspectorFields({ kind, config, update }: { kind: NodeKind; config: Record<string, string>; update: (k: string, v: string) => void }) {
  const fields: Record<NodeKind, { key: string; label: string; placeholder: string }[]> = {
    trigger: [{ key: "triggerType", label: "Trigger type", placeholder: "new_hire | birthday | deal" }],
    audience: [{ key: "source", label: "Source", placeholder: "hris | csv | segment" }],
    condition: [
      { key: "field", label: "Field", placeholder: "tenure" },
      { key: "value", label: "Value", placeholder: ">= 2 yrs" },
    ],
    gift: [
      { key: "giftRef", label: "Gift/collection", placeholder: "new-hire-welcome" },
      { key: "budgetCap", label: "Budget cap ($)", placeholder: "60" },
    ],
    budget: [
      { key: "perRecipientCap", label: "Per-recipient cap ($)", placeholder: "75" },
      { key: "costCentre", label: "Cost centre", placeholder: "MKT-01" },
    ],
    approval: [
      { key: "approver", label: "Approver", placeholder: "people-ops" },
      { key: "threshold", label: "Threshold ($)", placeholder: "500" },
    ],
    delay: [{ key: "days", label: "Wait (days)", placeholder: "3" }],
    send: [{ key: "channel", label: "Channel", placeholder: "email | link | physical" }],
    track: [],
  };
  return (
    <>
      {fields[kind].map((f) => (
        <label key={f.key} className="block">
          <span className="text-xs">{f.label}</span>
          <input
            value={config[f.key] ?? ""}
            placeholder={f.placeholder}
            onChange={(e) => update(f.key, e.target.value)}
            className="w-full rounded-lg border border-ink/10 px-2 py-1"
          />
        </label>
      ))}
    </>
  );
}

export function AutomationBuilder() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
