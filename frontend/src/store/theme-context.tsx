import { Props } from "../types/props";
import { createContext, useContext, useCallback, useState } from "react";

type ThemeData = {
  theme: string;
  setTheme: (theme: string) => void;
  changeTheme: (t: string) => void;
};
const themeData: ThemeData = {
  theme: "light",
  setTheme: (theme: string) => {},
  changeTheme: (t: string) => {},
};
const ThemeContext = createContext(themeData);

export const ThemeProvider = (props: Props) => {
  const [theme, setTheme] = useState<string>("light");

  const changeTheme = useCallback((t: string) => {
    if (t === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else if(t === "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    setTheme(t);
  }, []);
  const themeContext = {
    theme,
    setTheme,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
