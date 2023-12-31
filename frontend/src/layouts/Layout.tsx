import React from 'react';
import { Props } from '../types/props';
import Header from '../components/header';
import ScrollUpButton from '../components/scroll-up-button';
import LoginModal from '../components/modals/login-modal';
import { useAuth } from '../store/auth-context';
import RegisterModal from '../components/modals/register-modal';

const Layout = (props: Props) => {
  const { isLoggedIn } = useAuth();
  return (
    <React.Fragment>
      <Header/>
      <main>
        {!isLoggedIn && <React.Fragment>
          <LoginModal/> 
          <RegisterModal/>
        </React.Fragment>}
        {props.children}
      </main>
      <div className="fixed bottom-12 right-10">
        <ScrollUpButton />
      </div>
    </React.Fragment>
  )
}

export default Layout;