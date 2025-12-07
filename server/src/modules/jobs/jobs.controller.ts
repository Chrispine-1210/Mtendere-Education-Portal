// --- controller ---
// server/src/modules/jobs/jobs.controller.ts
import { Request, Response } from "express";
import * as service from "./jobs.service";

export const getAll = async (_req: Request, res: Response) => {
    const jobs = await service.findAll();
    res.json(jobs);
};

export const getOne = async (req: Request, res: Response) => {
    const job = await service.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
};

export const create = async (req: Request, res: Response) => {
    const job = await service.create(req.body);
    res.status(201).json(job);
};

export const update = async (req: Request, res: Response) => {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
};

export const remove = async (req: Request, res: Response) => {
    await service.remove(req.params.id);
    res.status(204).send();
};

