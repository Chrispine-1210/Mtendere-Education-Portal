// server/src/modules/scholarships/scholarships.routes.ts
import { Router } from "express";
import * as controller from "./scholarships.controller";

export const scholarshipRoutes = Router();

scholarshipRoutes.get("/", controller.getAll);
scholarshipRoutes.post("/", controller.create);
scholarshipRoutes.get("/:id", controller.getOne);
scholarshipRoutes.put("/:id", controller.update);
scholarshipRoutes.delete("/:id", controller.remove);