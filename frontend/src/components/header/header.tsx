import { Fragment, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../../components/theme-toggle';
import HeaderLink from './header-link';
import { useAuth } from '../../store/auth-context';
import { useAuthModal } from '../../store/auth-modal-context';
import useAxios from '../../hooks/use-axios';

const NAV_ITEMS = [
  { path: '', name: 'Clubs' },
  { path: 'events', name: 'Events' },
];

const LOGOUT_URL = "/auth/logout";

const Header = () => {
  const { isLoggedIn, user, clearState } = useAuth();
  const {
    loginOpen, setLoginOpen, registerOpen, setRegisterOpen
  } = useAuthModal();

  const axios = useAxios();

  const logout = useCallback(async() => {
      try {
        await axios.post(
          LOGOUT_URL,
        );
      } catch (err) {
        console.error(err);
      } finally {
        clearState();
      }
  }, [axios, clearState]);

  return (
    <nav className="flex flex-col justify-between py-12 md:flex-row">
      <Link to={"/"} className="self-start md:self-auto">
        <h1 className="text-3xl font-bold">{
          user ? user.full_name ?? user.email : "Events all Everywhere"
        }</h1>
      </Link>
      <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
        <ul className="flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.path}
              className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300"
            >
              <HeaderLink to={item.path}>{item.name}</HeaderLink>
            </li>
          ))}
          {!isLoggedIn ? <Fragment>
            <li className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300">
              <NavLink 
                to="#"
                onClick={e => setLoginOpen(!loginOpen)}
                className={`group`}
              >
                Login
                <span
                  className={`block h-0.5 max-w-0 bg-black transition-all duration-300 group-hover:max-w-full dark:bg-white`}
                ></span>
              </NavLink>
            </li>
            <li className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300">
              <NavLink 
                to="#"
                onClick={e => setRegisterOpen(!registerOpen)}
                className={`group`}
              >
                Register
                <span
                  className={`block h-0.5 max-w-0 bg-black transition-all duration-300 group-hover:max-w-full dark:bg-white`}
                ></span>
              </NavLink>
            </li>
          </Fragment> 
          :
          <li className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300">
            <NavLink 
              to="#"
              onClick={e => logout()}
              className={`group`}
            >
              Logout
              <span
                className={`block h-0.5 max-w-0 bg-black transition-all duration-300 group-hover:max-w-full dark:bg-white`}
              ></span>
            </NavLink>
          </li>
          }
        </ul>
        <div className="absolute right-[10vw] top-12 md:static">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Header;