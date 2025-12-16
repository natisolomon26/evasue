import { signJwt } from "./jwt";
import jwt from "jsonwebtoken";

export const createUserToken = (userId: string, email: string) => {
  return signJwt({ id: userId, email });
};

export const verifyToken = (req: Request) => {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded; // { id, email, role }
  } catch {
    return null;
  }
};

export const requireAdmin = (user: any) => user?.role === "admin";
