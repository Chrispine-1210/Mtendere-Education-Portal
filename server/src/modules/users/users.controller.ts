// --- controller ---
// server/src/modules/users/users.controller.ts
import { Request, Response } from "express";
import * as service from "./users.service";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await service.findAll();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await service.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await service.create(req.body);
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const updated = await service.update(req.params.id, req.body);
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  await service.remove(req.params.id);
  res.status(204).send();
};