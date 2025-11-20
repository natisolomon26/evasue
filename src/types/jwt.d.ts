export interface JwtUser {
  id: string;
  email: string;
  role: "admin" | "student";
}
