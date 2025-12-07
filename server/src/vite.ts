import { Express } from "express";
import { createServer as createViteServer, ViteDevServer } from "vite";
import type { Server } from "http";
import path from "path";
import express from "express";

let vite: ViteDevServer;

export const setupVite = async (app: Express, server: Server) => {
  vite = await createViteServer({
    server: { middlewareMode: true },
    root: path.resolve(__dirname, "../../client"),
    appType: "custom",
  });

  app.use(vite.middlewares);

  server.on("close", async () => {
    if (vite) await vite.close();
  });
};

export const serveStatic = (app: Express) => {
  const root = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(root));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(root, "index.html"));
  });
};

export const log = console.log;