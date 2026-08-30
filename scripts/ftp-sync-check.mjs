#!/usr/bin/env node
/**
 * scripts/ftp-sync-check.mjs — Compare local out/ with remote server files.
 * Lists remote files and shows what's missing, extra, or different.
 *
 * Usage:
 *   node scripts/ftp-sync-check.mjs          # show differences
 *   node scripts/ftp-sync-check.mjs --list   # just list remote files
 *
 * Requires FTP_HOST, FTP_USER, FTP_PASSWORD in environment.
 */
import { Client } from "basic-ftp";
import { readdirSync, statSync, createHash, readFileSync } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash as createNodeHash } from "node:crypto";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "out");
const REMOTE_BASE = process.env.FTP_REMOTE_PATH || "ourdreams";

const FTP = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  port: Number(process.env.FTP_PORT || 21),
};

/* ------------------------------------------------------------------ */
/* Walk local directory                                               */
/* ------------------------------------------------------------------ */
function walkLocal(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walkLocal(full));
    else out.push(full);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Compute MD5                                                         */
/* ------------------------------------------------------------------ */
async function md5File(filePath) {
  const buf = await readFile(filePath);
  return createNodeHash("md5").update(buf).digest("hex");
}

/* ------------------------------------------------------------------ */
/* List remote files recursively                                       */
/* ------------------------------------------------------------------ */
async function listRemote(client, path = "") {
  const results = [];
  const list = await client.list(path);
  for (const item of list) {
    const remotePath = path ? `${path}/${item.name}` : item.name;
    if (item.isDirectory) {
      results.push(...await listRemote(client, remotePath));
    } else if (item.isFile) {
      results.push({ path: remotePath, size: item.size });
    }
  }
  return results;
}

/* ------------------------------------------------------------------ */
/* Main                                                               */
/* ------------------------------------------------------------------ */
async function main() {
  if (!FTP.host || !FTP.user || !FTP.password) {
    console.error("Set FTP_HOST, FTP_USER, FTP_PASSWORD in environment.");
    process.exit(1);
  }

  const onlyList = process.argv.includes("--list");

  // Local files
  const localFiles = walkLocal(OUT_DIR).map((f) => relative(OUT_DIR, f).replace(/\\/g, "/"));
  const localSet = new Set(localFiles);

  // Remote files
  const client = new Client();
  client.ftp.timeout = 30000;
  await client.access(FTP);

  // Navigate to the ourdreams directory
  const rootList = await client.list("");
  const hasOurdreams = rootList.some((i) => i.name === "ourdreams" && i.isDirectory);
  const remoteFiles = await listRemote(client, hasOurdreams ? REMOTE_BASE : "");
  const remotePaths = remoteFiles.map((f) => f.path.replace(/\\/g, "/"));
  const remoteSet = new Set(remotePaths);

  if (onlyList) {
    console.log("Remote files:");
    remotePaths.forEach((f) => console.log("  " + f));
    console.log(`\n${remotePaths.length} files on server.`);
    client.close();
    return;
  }

  // Compare
  const missing = localFiles.filter((f) => !remoteSet.has(f));
  const extra = remotePaths.filter((f) => !localSet.has(f));
  const common = localFiles.filter((f) => remoteSet.has(f));

  console.log(`Local: ${localFiles.length} files`);
  console.log(`Remote: ${remotePaths.length} files`);
  console.log(`In sync: ${common.length} files`);

  if (missing.length > 0) {
    console.log(`\n${missing.length} files MISSING from server (need upload):`);
    missing.slice(0, 20).forEach((f) => console.log("  + " + f));
    if (missing.length > 20) console.log(`  ... and ${missing.length - 20} more`);
  }

  if (extra.length > 0) {
    console.log(`\n${extra.length} files EXTRA on server (not in local build):`);
    extra.slice(0, 20).forEach((f) => console.log("  - " + f));
    if (extra.length > 20) console.log(`  ... and ${extra.length - 20} more`);
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log("\n✓ Server is in sync with local build!");
  }

  client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
