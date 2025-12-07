// --- service ---
// server/src/modules/jobs/jobs.service.ts
const db: any[] = [];

export const findAll = async () => db;
export const findById = async (id: string) => db.find(j => j.id === id);

export const create = async (data: any) => {
    const job = { id: Date.now().toString(), ...data };
    db.push(job);
    return job;
};

export const update = async (id: string, data: any) => {
    const i = db.findIndex(j => j.id === id);
    if (i === -1) return null;
    db[i] = { ...db[i], ...data };
    return db[i];
};

export const remove = async (id: string) => {
    const i = db.findIndex(j => j.id === id);
    if (i !== -1) db.splice(i, 1);
};

