"use client";

import { useState } from "react";
import { api } from "@/lib/wc/proxy";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      setMsg("Please enter a valid email.");
      return;
    }
    setStatus("sending");
    try {
      await api.newsletter({ email });
      setStatus("done");
      setMsg("Thanks — you're on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="mt-3" noValidate>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex gap-2">
        <input
          id="nl-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="min-w-0 flex-1 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-sm outline-none focus:border-gold"
        />
        <button type="submit" className="btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "…" : "Join"}
        </button>
      </div>
      {msg && (
        <p className={`mt-2 text-xs ${status === "error" ? "text-red-600" : "text-sage"}`} role="status">
          {msg}
        </p>
      )}
    </form>
  );
}
