import React from 'react';
import { Props } from '../types/props';
import Header from '../components/header';
import ScrollUpButton from '../components/scroll-up-button';

const Layout = (props: Props) => {
  return (
    <React.Fragment>
      <Header/>
      <main>{props.children}</main>
      <div className="fixed bottom-12 right-10">
        <ScrollUpButton />
      </div>
    </React.Fragment>
  )
}

export default Layout;