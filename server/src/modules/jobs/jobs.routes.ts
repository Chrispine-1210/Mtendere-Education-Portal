// server/src/modules/jobs/jobs.routes.ts
import { Router } from "express";
import * as controller from "./jobs.controller";

export const jobRoutes = Router();

jobRoutes.get("/", controller.getAll);
jobRoutes.post("/", controller.create);
jobRoutes.get("/:id", controller.getOne);
jobRoutes.put("/:id", controller.update);
jobRoutes.delete("/:id", controller.remove);

