"use client";

import { useState } from "react";
import { api } from "@/lib/wc/proxy";

export function DemoForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", company: "", size: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please add your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "A valid email, please.";
    if (!form.company.trim()) errs.company = "Which company?";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      await api.demoRequest({ ...form, website: form.website || undefined });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card p-6 text-center" role="status">
        <p className="font-display text-xl">Thank you, {form.name.split(" ")[0] || "friend"}.</p>
        <p className="mt-2 text-sm text-ink/70">A specialist will reach out shortly. (Demo handler queued via PHP proxy.)</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={compact ? "space-y-3" : "space-y-4"} noValidate>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={set} error={errors.name} />
        <Field label="Work email" name="email" type="email" value={form.email} onChange={set} error={errors.email} />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Company" name="company" value={form.company} onChange={set} error={errors.company} />
        <Field label="Team size" name="size" placeholder="e.g. 250" value={form.size} onChange={set} />
      </div>
      {/* Honeypot — hidden from humans, bots fill it */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>Website <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>
      {status === "error" && <p className="text-sm text-red-600" role="alert">Something went wrong. Please try again.</p>}
      <button type="submit" className="btn-primary w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request a demo"}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }: { label: string; name: string; value: string; onChange: (k: string, v: string) => void; error?: string; type?: string; placeholder?: string }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full rounded-xl border bg-white/70 px-3 py-2 outline-none focus:border-gold ${error ? "border-red-400" : "border-ink/10"}`}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
