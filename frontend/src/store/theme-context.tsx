import { Props } from "../types/props";
import { createContext, useContext, useCallback, useState } from "react";

type ThemeData = {
  theme: string;
  setTheme: (theme: string) => void;
};
const themeData: ThemeData = {
  theme: "light",
  setTheme: (theme: string) => {},
};
const ThemeContext = createContext(themeData);

export const ThemeProvider = (props: Props) => {
  const [theme, setTheme] = useState<string>("light");
  const themeContext = {
    theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
