export type AuthData = {
  token: string | null;
  isLoggedIn: boolean;
  setToken: (token: string) => void;
};
