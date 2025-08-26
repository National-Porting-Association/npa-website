import { createReadStream } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join, extname } from "path";
import { promises as fs } from "fs";

const gamesDirectory = join(process.cwd(), "public", "games");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("X-Frame-Options", "ALLOWALL");
  res.setHeader("Content-Security-Policy", "frame-ancestors *");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  let pathParts = req.query.slug;
  if (!pathParts) {
    res.status(400).json({ error: "A valid path is required." });
    return;
  }
  if (typeof pathParts === "string") pathParts = [pathParts];
  const filePath = join(gamesDirectory, ...(pathParts as string[]));

  try {
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      const indexPath = join(filePath, "index.html");
      try {
        let indexContent = await fs.readFile(indexPath, "utf8");
        const slug = (pathParts as string[])[0];

        if (!/\<base\s+href=/i.test(indexContent)) {
          const baseTag = `<base href="/api/gamedata/play/${slug}/">`;
          indexContent = indexContent.replace(/<\/head>/i, baseTag + "\n</head>");
        }
        const absPrefix = `/api/gamedata/play/${slug}/`;
        indexContent = indexContent.replace(/(["'])Build\//g, `$1${absPrefix}Build/`);
        indexContent = indexContent.replace(/(["'])TemplateData\//g, `$1${absPrefix}TemplateData/`);

        // Inject mobile.js
        const ua = req.headers["user-agent"] || "";
        if (/iPhone|iPad|iPod|Android/i.test(ua)) {
          indexContent = indexContent.replace(/<\/head>/i, '<script src="/api/mobile.js"></script></head>');
        }

        res.setHeader("Content-Type", "text/html");
        res.status(200).send(indexContent);
        return;
      } catch {
        const files = await fs.readdir(filePath);
        res.status(200).json({ files });
        return;
      }
    }

    const ext = extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".js": "application/javascript",
      ".json": "application/json",
      ".html": "text/html",
      ".wasm": "application/wasm",
      ".data": "application/octet-stream",
      ".unityweb": "application/octet-stream",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".mp3": "audio/mpeg",
      ".ogg": "audio/ogg",
      ".mp4": "video/mp4",
      ".txt": "text/plain",
      ".css": "text/css",
      ".ico": "image/x-icon",
    };

    res.setHeader("Content-Type", mimeTypes[ext] || "application/octet-stream");
    res.setHeader("Content-Length", stats.size);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    const stream = createReadStream(filePath);
    stream.pipe(res);
  } catch (error) {
    res.status(404).json({ error: "File or directory not found." });
  }
}
