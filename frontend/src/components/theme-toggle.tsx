
import { BsMoon, BsMoonFill, BsSun } from 'react-icons/bs';

import useMounted from '../hooks/use-mounted';
import { useTheme } from '../store/theme-context';
import { useState } from 'react';

export default function ThemeToggle() {
  const { theme, changeTheme } = useTheme();
  const [state, setState] = useState<boolean>(theme === "dark");
  const mounted = useMounted();
  const iconCN = 'z-10 h-8 w-8 p-[0.4rem]';

  return (
    <div className="relative flex h-10 w-[5.5rem] cursor-pointer items-center justify-between rounded-full bg-gradient-to-br from-gray-50 to-white px-2 shadow-md shadow-gray-400 transition-all duration-500 dark:from-gray-700 dark:to-customGray-dark dark:shadow-black">
      {mounted && (
        <>
          <BsSun
            className={`${iconCN} text-white`}
            onClick={() => {
              changeTheme("light");
              setState(false);
            }}
          />
          {!state? (
            <BsMoon className={iconCN} onClick={() => {
              changeTheme("dark");
              setState(true);
            }} />
          ) : (
            <BsMoonFill
              className={`${iconCN} text-black`}
              onClick={() => {
                changeTheme("dark");
                setState(true);
              }}
            />
          )}
        </>
      )}
      <span className="absolute left-[8px] h-8 w-8 rounded-full bg-black transition-all duration-500 dark:left-auto dark:translate-x-[40px] dark:bg-white" />
    </div>
  );
}