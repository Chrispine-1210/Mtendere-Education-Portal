

// --- controller ---
// server/src/modules/scholarships/scholarships.controller.ts
import { Request, Response } from "express";
import * as service from "./scholarships.service";

export const getAll = async (_req: Request, res: Response) => {
    const data = await service.findAll();
    res.json(data);
};

export const getOne = async (req: Request, res: Response) => {
    const item = await service.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
};

export const create = async (req: Request, res: Response) => {
    const item = await service.create(req.body);
    res.status(201).json(item);
};

export const update = async (req: Request, res: Response) => {
    const item = await service.update(req.params.id, req.body);
    res.json(item);
};

export const remove = async (req: Request, res: Response) => {
    await service.remove(req.params.id);
    res.status(204).send();
};

