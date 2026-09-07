import express from "express";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

// Serve the Netlify function endpoint
// Netlify exposes functions at /.netlify/functions/<name>
app.get("/.netlify/functions/get-config", (req, res) => {
  // Mirrors netlify/functions/get-config.js (kept as-is for Netlify deploys)
  res.set("Content-Type", "application/json");
  res.set("Cache-Control", "public, max-age=300");
  res.json({
    apiKey: process.env.API_SPORTS_KEY,
    sport: "football",
    lang: "en",
    theme: "grey",
    showError: false,
    showLogos: true,
    refresh: 20,
    favorite: true,
    playerTrophies: true,
    standings: true,
    playerInjuries: true,
    teamSquad: true,
    teamStatistics: true,
    playerStatistics: true,
  });
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
