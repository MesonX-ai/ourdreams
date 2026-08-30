"use client";

import { useState } from "react";
import { api } from "@/lib/wc/proxy";

export type CgRequestFormProps = {
  id?: string;
  dark?: boolean;
};

export function CgRequestForm({ id, dark = false }: CgRequestFormProps) {
  const formId = id ?? "cg";
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    kind: "demo",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "A valid email, please.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      await api.demoRequest({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
        email: form.email,
        phone: form.phone || undefined,
        message: form.message || undefined,
        kind: form.kind,
        website: form.website || undefined,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="py-10 text-center">
        <p className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)" }}>
          Thank you!
        </p>
        <p className="mt-2 text-sm text-[#62646a]">A specialist will reach out shortly.</p>
      </div>
    );
  }

  const name = `${formId}-`;
  const labelCls = dark ? "text-white" : "text-[#222325]";
  const inputCls = `cg-field ${dark ? "border-white/40 bg-white/10 text-white placeholder-white/50" : ""}`;
return (
    <form onSubmit={submit} className="space-y-4" noValidate id={formId}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={`cg-label ${labelCls}`} htmlFor={`${name}fn`}>First Name*</label>
          <input
            id={`${name}fn`}
            className={inputCls}
            value={form.firstName}
            onChange={(e) => set("firstName", e.target.value)}
            placeholder="Jane"
          />
          {errors.firstName && <span className="mt-1 block text-xs text-red-500">{errors.firstName}</span>}
        </div>
        <div>
          <label className={`cg-label ${labelCls}`} htmlFor={`${name}ln`}>Last Name*</label>
          <input
            id={`${name}ln`}
            className={inputCls}
            value={form.lastName}
            onChange={(e) => set("lastName", e.target.value)}
            placeholder="Doe"
          />
          {errors.lastName && <span className="mt-1 block text-xs text-red-500">{errors.lastName}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={`cg-label ${labelCls}`} htmlFor={`${name}email`}>Email address*</label>
          <input
            id={`${name}email`}
            type="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jane@company.com"
          />
          {errors.email && <span className="mt-1 block text-xs text-red-500">{errors.email}</span>}
        </div>
        <div>
          <label className={`cg-label ${labelCls}`} htmlFor={`${name}phone`}>Phone number</label>
          <input
            id={`${name}phone`}
            type="tel"
            className={inputCls}
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <span className={`cg-label ${labelCls}`}>Help us direct you to the right expert:</span>
        <div className="space-y-2">
          {[
            { value: "demo", label: "I want a demo of your gifting platform for my company's ongoing gifting needs." },
            { value: "one-time", label: "I need help with a one-time gift project." },
          ].map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-start gap-3 text-sm">
              <input
                type="radio"
                name={`${name}kind`}
                checked={form.kind === opt.value}
                onChange={() => set("kind", opt.value as typeof form.kind)}
                className="mt-0.5 h-4 w-4 accent-black"
              />
              <span className={dark ? "text-white/90" : "text-[#222325]"}>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className={`cg-label ${labelCls}`} htmlFor={`${name}msg`}>Message</label>
        <textarea
          id={`${name}msg`}
          rows={3}
          className={inputCls}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your gifting program…"
        />
      </div>

      {/* Honeypot — hidden from humans, bots fill it */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#62646a]">
        <input
          type="checkbox"
          defaultChecked
          className="mt-0.5 h-4 w-4 accent-black"
        />
        <span>
          You agree to receive communication about our products, services and related content. You may unsubscribe
          anytime. Review our privacy policy.
        </span>
      </label>

      {status === "error" && (
        <p className="text-sm text-red-500" role="alert">Something went wrong. Please try again.</p>
      )}

      <button type="submit" disabled={status === "sending"} className="cg-solid-btn w-full" style={{ height: 48 }}>
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}