export type LoginData = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshData = {
  token: string;
};

export type AuthData = {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (loginData: LoginData) => void;
  logout: () => void;
  refreshRequest: (refreshData: RefreshData) => void;
};
