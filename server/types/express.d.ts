import { UserRole } from "@shared/types"; // Or define inline if not already existing

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                email: string;
                role: UserRole | string;
            };
        }
    }
}

export { };

