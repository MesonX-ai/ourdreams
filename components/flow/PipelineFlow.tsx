"use client";

import { useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useReducedMotion } from "framer-motion";

type StepData = { label: string; sub: string; tone: "ink" | "plum" | "sage" | "gold" };

function PipelineNode({ data, className }: NodeProps & { className?: string }) {
  const d = data as unknown as StepData;
  const toneBg =
    d.tone === "plum" ? "bg-plum text-cream" : d.tone === "sage" ? "bg-sage text-cream" : d.tone === "gold" ? "bg-champagne text-ink" : "bg-white text-ink border border-ink/10";
  return (
    <div className={`rounded-2xl px-4 py-3 shadow-soft ${toneBg} ${className ?? ""}`}>
      <p className="font-display text-sm leading-tight">{d.label}</p>
      <p className="text-[11px] opacity-70">{d.sub}</p>
    </div>
  );
}

const nodeTypes = { step: PipelineNode as never };

const baseNodes: Node[] = [
  { id: "trigger", type: "step", position: { x: 0, y: 40 }, data: { label: "Trigger", sub: "New hire · Birthday · Deal", tone: "ink" } },
  { id: "audience", type: "step", position: { x: 220, y: 40 }, data: { label: "Audience", sub: "List · segment · CSV", tone: "plum" } },
  { id: "gift", type: "step", position: { x: 440, y: 40 }, data: { label: "Gift / Collection", sub: "Curated or eGift", tone: "gold" } },
  { id: "personalize", type: "step", position: { x: 660, y: 40 }, data: { label: "Personalize", sub: "Note · branding", tone: "sage" } },
  { id: "send", type: "step", position: { x: 880, y: 40 }, data: { label: "Send", sub: "Email · ship", tone: "plum" } },
  { id: "track", type: "step", position: { x: 1100, y: 40 }, data: { label: "Track", sub: "Engagement", tone: "ink" } },
];

const baseEdges: Edge[] = [
  { id: "e1", source: "trigger", target: "audience", animated: true },
  { id: "e2", source: "audience", target: "gift", animated: true },
  { id: "e3", source: "gift", target: "personalize", animated: true },
  { id: "e4", source: "personalize", target: "send", animated: true },
  { id: "e5", source: "send", target: "track", animated: true },
];

export function PipelineFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  // Stagger node appearance once active.
  const nodes = baseNodes.map((n, i) => ({
    ...n,
    className: `transition-all duration-500 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`,
    style: { transitionDelay: `${i * 180}ms` },
  }));

  if (reduce) return <PipelineFallback />;

  return (
    <div ref={ref} className="h-[180px] w-full overflow-hidden rounded-2xl border border-ink/10 bg-cream/60">
      <ReactFlow
        nodes={nodes}
        edges={baseEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnDrag={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={22} size={1.5} color="rgba(18,19,26,0.12)" />
      </ReactFlow>
    </div>
  );
}

export function PipelineFallback() {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-ink/10 bg-cream/60 p-4" aria-hidden>
      {["Trigger", "Audience", "Gift / Collection", "Personalize", "Send", "Track"].map((s, i) => (
        <span key={s} className="inline-flex items-center gap-2">
          <span className="rounded-xl bg-white px-3 py-2 text-sm shadow-soft">{s}</span>
          {i < 5 && <span className="text-gold">→</span>}
        </span>
      ))}
    </div>
  );
}
