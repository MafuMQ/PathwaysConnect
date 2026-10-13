import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

function tertiaryEducationApiPlugin() {
  return {
    name: "tertiary-education-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith("/api/programmes/qualify") && req.method === "POST") {
          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", async () => {
            try {
              const { evaluateStudentQualification } = require("./server/matcher.cjs");
              const parsed = JSON.parse(body || "{}");
              const result = await evaluateStudentQualification(parsed.marks, parsed.filters);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result));
            } catch (err) {
              console.error("API error /api/programmes/qualify:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message || "Internal database error" }));
            }
          });
          return;
        }

        if (req.url && req.url.startsWith("/api/programmes/filters") && req.method === "GET") {
          try {
            const { getFilterOptions } = require("./server/matcher.cjs");
            const result = await getFilterOptions();
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } catch (err) {
            console.error("API error /api/programmes/filters:", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message || "Internal database error" }));
          }
          return;
        }

        if (req.url && req.url.startsWith("/api/ai/scan-report") && req.method === "POST") {
          let body = "";
          req.on("data", chunk => { body += chunk; });
          req.on("end", async () => {
            try {
              const { analyzeAcademicReport } = require("./server/ai.cjs");
              const parsed = JSON.parse(body || "{}");
              if (!parsed.image) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Image data is required in the request payload." }));
                return;
              }
              const result = await analyzeAcademicReport(parsed.image, parsed.mimeType || "image/jpeg");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(result));
            } catch (err) {
              console.error("API error /api/ai/scan-report:", err);
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: err.message || "Error analyzing academic document" }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups"
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), tertiaryEducationApiPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
