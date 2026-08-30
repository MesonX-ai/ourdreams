import { parseIntegrations } from "../types";

export const integrations = parseIntegrations([
  { slug: "workday", name: "Workday", category: "hris", blurb: "New-hire and anniversary triggers straight from your HRIS.", angle: 0 },
  { slug: "bamboo-hr", name: "BambooHR", category: "hris", blurb: "Sync headcount, tenure and departments for audience targeting.", angle: 28 },
  { slug: "salesforce", name: "Salesforce", category: "crm", blurb: "Celebrate deal milestones and pipeline stages automatically.", angle: 56 },
  { slug: "hubspot", name: "HubSpot", category: "crm", blurb: "Trigger sends from lifecycle and deal-closed events.", angle: 84 },
  { slug: "slack", name: "Slack", category: "messaging", blurb: "Approve campaigns and get delivery digests in-channel.", angle: 112 },
  { slug: "teams", name: "Microsoft Teams", category: "messaging", blurb: "Native approvals and notifications for M365 shops.", angle: 140 },
  { slug: "google-calendar", name: "Google Calendar", category: "calendar", blurb: "Birthday and work-anniversary detection from calendars.", angle: 168 },
  { slug: "gusto", name: "Gusto", category: "payroll", blurb: "Cost-centre allocation and budget caps per recipient.", angle: 196 },
]);

export const integrationBySlug = (slug: string) =>
  integrations.find((i) => i.slug === slug);
