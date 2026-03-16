import { createReadStream } from "node:fs";
import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const argPort = Number.parseInt(process.argv[2] || "", 10);
const envPort = Number.parseInt(process.env.PORT || "", 10);
const port = argPort || envPort || 8123;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mpeg": "audio/mpeg",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp"
};

function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

function sendError(res, error) {
  res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(`Server error: ${error instanceof Error ? error.message : String(error)}`);
}

function toSafePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const trimmed = decoded === "/" ? "/index.html" : decoded;
  const resolved = path.resolve(rootDir, `.${trimmed}`);

  if (!resolved.startsWith(rootDir)) {
    return null;
  }

  return resolved;
}

async function resolveFile(requestPath) {
  const stats = await fs.stat(requestPath);
  if (stats.isDirectory()) {
    return path.join(requestPath, "index.html");
  }
  return requestPath;
}

const server = http.createServer(async (req, res) => {
  try {
    const safePath = toSafePath(req.url || "/");
    if (!safePath) {
      sendNotFound(res);
      return;
    }

    let filePath;
    try {
      filePath = await resolveFile(safePath);
      await fs.access(filePath);
    } catch {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    sendError(res, error);
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Preview server running at http://127.0.0.1:${port}/`);
  console.log(`Happybirthday page: http://127.0.0.1:${port}/happybirthday/`);
});
