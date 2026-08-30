#!/usr/bin/env node
/**
 * scripts/ftp-deploy.mjs — Upload new/changed files from out/ to GoDaddy.
 *
 * - Reads FTP credentials from the "OurDreams" entry in ftp-config.json
 *   (looked for in the project dir first, then its parent dir).
 * - Target is the EXISTING public_html/ourdreams.us folder on the server.
 *   This script NEVER creates public_html or ourdreams.us — it cd's into
 *   them and aborts if they are missing. Only sub-folders INSIDE
 *   ourdreams.us are created (needed for new _next/ asset directories).
 * - Only uploads files whose MD5 checksum differs from the manifest at
 *   .deploy-checksums.json (new or edited files).
 *
 * Usage:
 *   node scripts/ftp-deploy.mjs            # upload changed files
 *   node scripts/ftp-deploy.mjs --dry-run  # list what would be uploaded
 */
import { Client } from "basic-ftp";
import { createHash } from "node:crypto";
import { createReadStream, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, posix, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "out");
const MANIFEST = join(ROOT, ".deploy-checksums.json");
const SITE_NAME = "OurDreams";

/* ------------------------------------------------------------------ */
/* Locate ftp-config.json and pick the "OurDreams" entry               */
/* ------------------------------------------------------------------ */
function loadFtpConfig() {
  const candidates = [
    process.env.FTP_CONFIG,
    join(ROOT, "ftp-config.json"),
    join(ROOT, "..", "ftp-config.json"),
  ].filter(Boolean);

  for (const path of candidates) {
    if (existsSync(path)) {
      const entries = JSON.parse(readFileSync(path, "utf8"));
      const entry = entries.find(
        (e) => (e.name || "").toLowerCase() === SITE_NAME.toLowerCase()
      );
      if (!entry) {
        throw new Error(`No "${SITE_NAME}" entry found in ${path}`);
      }
      console.log(`Using FTP config: ${path} [entry: ${entry.name}]`);
      return entry;
    }
  }
  throw new Error(
    "ftp-config.json not found (looked in project dir and its parent). " +
      "Set FTP_CONFIG=/path/to/ftp-config.json to point at it."
  );
}

/* ------------------------------------------------------------------ */
/* Resolve the remote base dir: the existing ourdreams.us folder       */
/* (i.e. public_html/ourdreams.us on the hosting server).              */
/* NEVER created here — must already exist on the server.              */
/* ------------------------------------------------------------------ */
function remoteBaseCandidates(entry) {
  let p = (entry.path || "").trim().replace(/\/+$/, "");
  if (!p) throw new Error('The "OurDreams" ftp-config entry has no "path".');
  if (p.startsWith("/")) return [p];
  // Config stores a relative name like "ourdreams.us". The FTP login for
  // mesonsoft@mesonsoft.com lands directly in the web root (public_html),
  // so try both /ourdreams.us and /public_html/ourdreams.us.
  return [`/${p}`, `/public_html/${p}`];
}

/* ------------------------------------------------------------------ */
/* Local file walk + MD5                                               */
/* ------------------------------------------------------------------ */
function walkLocal(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) files.push(...walkLocal(full));
    else files.push(full);
  }
  return files;
}

function md5File(filePath) {
  return new Promise((resolve, reject) => {
    const hash = createHash("md5");
    const stream = createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}


/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
async function main() {
  const dryRun = process.argv.includes("--dry-run");

  if (!existsSync(OUT_DIR)) throw new Error("out/ not found — run the build first.");
  if (!existsSync(join(OUT_DIR, "index.html")))
    throw new Error("out/index.html missing — build appears incomplete.");

  const entry = loadFtpConfig();
  const candidates = remoteBaseCandidates(entry);
  console.log(`Remote target (must already exist): ${candidates.join(" or ")}`);

  // Local checksums
  const localFiles = walkLocal(OUT_DIR);
  const local = new Map(); // relPath -> md5
  for (const f of localFiles) {
    const rel = relative(OUT_DIR, f).split("\\").join("/");
    local.set(rel, await md5File(f));
  }

  // Previous deploy manifest
  let prev = {};
  if (existsSync(MANIFEST)) {
    try { prev = JSON.parse(readFileSync(MANIFEST, "utf8")); } catch { prev = {}; }
  }

  // New or edited files (checksum differs)
  const changed = [];
  for (const [rel, sum] of local) {
    if (prev[rel] !== sum) changed.push(rel);
  }
  changed.sort();

  const skipped = local.size - changed.length;
  console.log(`Local files: ${local.size} | changed/new: ${changed.length} | unchanged: ${skipped}`);

  if (changed.length === 0) {
    console.log("✓ Nothing to upload — server already up to date.");
    return;
  }
  console.log("Files to upload:");
  changed.forEach((f) => console.log("  ↑ " + f));
  if (dryRun) {
    console.log(`\n[dry-run] ${changed.length} files would be uploaded to ${candidates[0]}. No changes made.`);
    return;
  }

  // Connect
  const client = new Client(0);
  client.ftp.timeout = 60000;
  await client.access({
    host: entry.host,
    port: Number(entry.port || 21),
    user: entry.username,
    password: entry.password,
    secure: false, // entry.type === "ftp" (plain FTP, GoDaddy)
  });

  // Hard requirement: the existing ourdreams.us folder (public_html/ourdreams.us
  // on the hosting server) must ALREADY exist. cd into it; if no candidate
  // works, abort — we never mkdir public_html or ourdreams.us itself.
  let base = null;
  for (const candidate of candidates) {
    try {
      await client.cd(candidate);
      base = candidate;
      break;
    } catch {
      // try the next candidate
    }
  }
  if (!base) {
    throw new Error(
      `None of [${candidates.join(", ")}] exist on the server (or are not accessible). ` +
        `This deploy must target the EXISTING ourdreams.us folder under the ` +
        `web root (public_html) — it will not create it.`
    );
  }
  console.log(`Connected. Inside ${base}.`);

  // Upload only changed files, creating only sub-folders INSIDE the base.
  let uploaded = 0;
  const failed = [];
  for (const rel of changed) {
    const remotePath = rel.split("\\").join("/");
    try {
      const dir = posix.dirname(remotePath);
      if (dir && dir !== ".") await client.ensureDir(dir);
      await client.uploadFrom(join(OUT_DIR, rel), remotePath);
      uploaded++;
      console.log(`  ✓ ${rel}`);
    } catch (e) {
      failed.push({ rel, error: e.message });
      console.error(`  ✗ ${rel} — ${e.message}`);
    }
  }

  // Save the manifest only if every file uploaded (so failures retry next run)
  if (failed.length === 0) {
    const next = {};
    for (const [rel, sum] of local) next[rel] = sum;
    writeFileSync(MANIFEST, JSON.stringify(next, null, 2));
    console.log(`\n✓ Deployed ${uploaded} file(s) to ${base}. Checksum manifest updated.`);
  } else {
    console.error(`\n✗ ${failed.length} upload(s) failed — they will retry on the next run.`);
    process.exitCode = 1;
  }

  client.close();
}

main().catch((e) => {
  console.error(`FTP deploy failed: ${e.message}`);
  process.exit(1);
});
