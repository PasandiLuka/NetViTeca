import type { User } from "./UserModel";

export type AuthContextType = {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logoutUser: () => void;
};