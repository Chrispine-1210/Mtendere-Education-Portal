import { JwtPayload } from "jsonwebtoken"; // Adjust path to your JWT decode type

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | { id: string; role: string }; // Or whatever your decoded token returns
    }
  }
}
