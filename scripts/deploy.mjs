// scripts/deploy.mjs — FTP deploy of out/ + php/ to the GoDaddy web root.
// Dry-run by default: `npm run deploy:dry`. Real upload with `npm run deploy`.
//
// Reads FTP_HOST / FTP_USER / FTP_PASSWORD from env (never committed).
// Mirrors out/ -> ourdreams.us and php/ -> ourdreams.us/api on the FTP server
// (the FTP home is public_html), removes stale files, and never touches wp/.
import { Client } from "basic-ftp";
import { readdirSync, statSync, createReadStream, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const DRY = process.argv.includes("--dry");
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "out");
const PHP_DIR = join(ROOT, "php");
const REMOTE_WEB = process.env.FTP_REMOTE_WEB || "ourdreams.us";
const REMOTE_API = `${REMOTE_WEB}/api`;

const FTP = {
  host: process.env.FTP_HOST,
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  secure: true,
  port: Number(process.env.FTP_PORT || 21),
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

async function main() {
  if (!existsSync(OUT_DIR)) {
    console.error(`No out/ found. Run \`npm run build\` first.`);
    process.exit(1);
  }

  const manifest = [];
  const outFiles = walk(OUT_DIR).map((f) => relative(OUT_DIR, f));
  const phpFiles = walk(PHP_DIR).map((f) => relative(PHP_DIR, f));
  manifest.push(...outFiles.map((f) => `${REMOTE_WEB}/${f}`));
  manifest.push(...phpFiles.map((f) => `${REMOTE_API}/${f}`));
  manifest.push(`${REMOTE_WEB}/.htaccess`);

  console.log(DRY ? "DRY RUN — files that would be uploaded:" : "UPLOADING:");
  manifest.forEach((m) => console.log("  " + m));
  console.log(`\n${manifest.length} files.`);

  if (DRY) {
    console.log("\nDry-run complete. Run `npm run deploy` (with FTP_HOST/FTP_USER/FTP_PASSWORD) to actually upload.");
    return;
  }

  if (!FTP.host || !FTP.user || !FTP.password) {
    console.error("Set FTP_HOST, FTP_USER, FTP_PASSWORD in the environment.");
    process.exit(1);
  }

  const client = new Client();
  client.ftp.timeout = 30000;
  try {
    await client.access(FTP);
    await client.ensureDir(REMOTE_WEB);
    await client.uploadFromDir(OUT_DIR, REMOTE_WEB);
    await client.ensureDir(REMOTE_API);
    await client.uploadFromDir(PHP_DIR, REMOTE_API);
    await client.uploadFrom(join(ROOT, ".htaccess"), `${REMOTE_WEB}/.htaccess`);
    console.log("\nDeploy complete.");
  } catch (err) {
    console.error("Deploy failed:", err);
    process.exit(1);
  } finally {
    client.close();
  }
}

main();
