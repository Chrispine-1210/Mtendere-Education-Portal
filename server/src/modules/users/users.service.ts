// --- service ---
// server/src/modules/users/users.service.ts
const db: any[] = []; // temporary in-memory DB

export const findAll = async () => db;

export const findById = async (id: string) => db.find(u => u.id === id);

export const create = async (data: any) => {
  const user = { id: Date.now().toString(), ...data };
  db.push(user);
  return user;
};

export const update = async (id: string, data: any) => {
  const i = db.findIndex(u => u.id === id);
  if (i === -1) return null;
  db[i] = { ...db[i], ...data };
  return db[i];
};

export const remove = async (id: string) => {
  const i = db.findIndex(u => u.id === id);
  if (i !== -1) db.splice(i, 1);
};



