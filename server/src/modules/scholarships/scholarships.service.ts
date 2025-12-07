// --- service ---
// server/src/modules/scholarships/scholarships.service.ts
const db: any[] = [];

export const findAll = async () => db;
export const findById = async (id: string) => db.find(item => item.id === id);

export const create = async (data: any) => {
    const item = { id: Date.now().toString(), ...data };
    db.push(item);
    return item;
};

export const update = async (id: string, data: any) => {
    const i = db.findIndex(item => item.id === id);
    if (i === -1) return null;
    db[i] = { ...db[i], ...data };
    return db[i];
};

export const remove = async (id: string) => {
    const i = db.findIndex(item => item.id === id);
    if (i !== -1) db.splice(i, 1);
};

