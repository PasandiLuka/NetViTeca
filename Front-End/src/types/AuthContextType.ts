import type { User } from "../utils/Auth";

export type AuthContextType = {
  user: User | null;
  login: (u: User) => void;
  logoutUser: () => void;
};