// scripts/preview.mjs — serve the static export locally for a quick look.
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..", "out");
const PORT = Number(process.env.PORT || 3000);

const TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

const server = createServer((req, res) => {
  let url = decodeURIComponent((req.url || "/").split("?")[0]);
  let path = normalize(join(ROOT, url));
  if (!path.startsWith(ROOT)) {
    res.writeHead(403).end("Forbidden");
    return;
  }
  if (statSync(path, { throwIfNoEntry: false })?.isDirectory()) {
    path = join(path, "index.html");
  }
  if (!existsSync(path)) {
    path = join(ROOT, "404.html");
    res.statusCode = 404;
  }
  try {
    const body = readFileSync(path);
    res.writeHead(res.statusCode || 200, { "Content-Type": TYPES[extname(path)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500).end("Server error");
  }
});

server.listen(PORT, () => console.log(`Previewing build at http://localhost:${PORT}`));
