import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Serve the Netlify function endpoint
// Netlify exposes functions at /.netlify/functions/<name>
app.get("/.netlify/functions/get-config", async (req, res) => {
  const event = { httpMethod: "GET" };
  try {
    // Load the function handler dynamically
    const handlerPath = path.join(__dirname, "netlify", "functions", "get-config.js");
    const mod = await import(`file://${handlerPath}?t=${Date.now()}`);
    const result = await mod.handler(event);
    res.status(result.statusCode || 200);
    if (result.headers) res.set(result.headers);
    res.send(result.body);
  } catch (err) {
    console.error("Function error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve static files from repo root
app.use(express.static(__dirname));

// SPA fallback (match netlify.toml redirect)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Webcast Sports running on http://0.0.0.0:${PORT}`);
});
