#!/usr/bin/env node
/**
 * deploy-helper.mjs — checksum-based diff, lftp script generation, and checksum persistence.
 *
 * Commands:
 *   diff <buildDir> <checksumFile>    — list new/changed files (one per line)
 *   lftp-script <buildDir> <host> <port> <user> <pass> <remotePath> [files...]
 *                                   — print an lftp script that uploads only the given files
 *   save <buildDir> <checksumFile>   — compute & save checksums for next diff
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative, dirname } from "node:path";

const [,, cmd, ...args] = process.argv;

/* ------------------------------------------------------------------ */
/* Compute MD5 of a file                                               */
/* ------------------------------------------------------------------ */
async function md5File(filePath) {
  const buf = await readFile(filePath);
  return createHash("md5").update(buf).digest("hex");
}

/* ------------------------------------------------------------------ */
/* Walk a directory → { relativePath: absolutePath }                   */
/* ------------------------------------------------------------------ */
async function walkDir(dir, base = dir) {
  const result = {};
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(result, await walkDir(abs, base));
    } else {
      result[relative(base, abs)] = abs;
    }
  }
  return result;
}

/* ------------------------------------------------------------------ */
/* Load previous checksums                                             */
/* ------------------------------------------------------------------ */
async function loadChecksums(file) {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/* Command: diff — list new or changed files                           */
/* ------------------------------------------------------------------ */
async function diff(buildDir, checksumFile) {
  const files = await walkDir(buildDir);
  const prev = await loadChecksums(checksumFile);
  const changed = [];

  for (const [relPath, absPath] of Object.entries(files)) {
    // Skip the checksum manifest itself if it exists in build dir
    if (relPath === ".deploy-checksums.json") continue;
    const hash = await md5File(absPath);
    if (prev[relPath] !== hash) {
      changed.push(relPath);
    }
  }

  // Also detect deleted files (in prev but not in build) — for awareness
  const currentKeys = new Set(Object.keys(files));
  const deleted = Object.keys(prev).filter((k) => !currentKeys.has(k) && k !== ".deploy-checksums.json");

  if (deleted.length > 0) {
    process.stderr.write(`  Note: ${deleted.length} files no longer in build (deleted locally)\n`);
  }

  process.stdout.write(changed.join("\n"));
}

/* ------------------------------------------------------------------ */
/* Command: lftp-script — generate lftp commands                       */
/* ------------------------------------------------------------------ */
async function lftpScript(buildDir, host, port, user, pass, remotePath, files) {
  const lines = [
    "set ssl:verify-certificate no",
    "set net:max-retries 3",
    "set net:timeout 30",
    "set ftp:charset utf8",
    "set ftp:passive on",
    `open -u ${user},${pass} -p ${port} ftp://${host}`,
    "",
    `# Navigate to the EXISTING remote folder (do not create new)`,
    `cd ${remotePath}`,
    "",
    `# Create subdirectories as needed`,
  ];

  // Collect unique directories
  const dirs = new Set();
  for (const f of files) {
    const d = dirname(f);
    if (d !== ".") dirs.add(d);
  }
  // Sort so parents come first
  const sortedDirs = [...dirs].sort();
  for (const d of sortedDirs) {
    lines.push(`mkdir -p "${d}"`);
  }

  lines.push("");
  lines.push("# Upload changed files");
  for (const f of files) {
    const abs = join(buildDir, f);
    lines.push(`put "${abs}" -O . "${f}"`);
  }

  lines.push("");
  lines.push("bye");

  process.stdout.write(lines.join("\n"));
}

/* ------------------------------------------------------------------ */
/* Command: save — compute & save all checksums                        */
/* ------------------------------------------------------------------ */
async function save(buildDir, checksumFile) {
  const files = await walkDir(buildDir);
  const checksums = {};
  for (const [relPath, absPath] of Object.entries(files)) {
    if (relPath === ".deploy-checksums.json") continue;
    checksums[relPath] = await md5File(absPath);
  }
  await writeFile(checksumFile, JSON.stringify(checksums, null, 2));
  process.stderr.write(`  Saved ${Object.keys(checksums).length} checksums\n`);
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */
switch (cmd) {
  case "diff": {
    const [buildDir, checksumFile] = args;
    await diff(buildDir, checksumFile);
    break;
  }
  case "lftp-script": {
    const [buildDir, host, port, user, pass, remotePath, ...files] = args;
    await lftpScript(buildDir, host, port, user, pass, remotePath, files);
    break;
  }
  case "save": {
    const [buildDir, checksumFile] = args;
    await save(buildDir, checksumFile);
    break;
  }
  default:
    process.stderr.write(`Unknown command: ${cmd}\n`);
    process.exit(1);
}
