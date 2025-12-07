// server/src/modules/users/users.routes.ts
import { Router } from "express";
import * as controller from "./users.controller";

export const userRoutes = Router();

userRoutes.get("/", controller.getAllUsers);
userRoutes.get("/:id", controller.getUserById);
userRoutes.post("/", controller.createUser);
userRoutes.put("/:id", controller.updateUser);
userRoutes.delete("/:id", controller.deleteUser);
