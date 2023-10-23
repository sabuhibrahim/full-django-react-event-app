import { User } from "./user";

export type AuthData = {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  login: boolean;
  updateLogin: (l: boolean) => void;
  clearState: () => void;
};
