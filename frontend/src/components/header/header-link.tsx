import React from 'react';
import { NavLink, useLocation, matchPath } from 'react-router-dom';

type LinkProp = {
  to: string,
  children: React.ReactNode
}

const HeaderLink = (props: LinkProp) => {
  const location = useLocation();
  const isLinkActive = matchPath(props.to, location.pathname);
  return (
    <NavLink 
      to={props.to}
      className={`group`}
    >
      {props.children}
      <span
        className={`block h-0.5 max-w-0 bg-black transition-all duration-300 group-hover:max-w-full dark:bg-white ${
          isLinkActive && 'max-w-full'
        }`}
      ></span>
    </NavLink>
  )
}

export default HeaderLink