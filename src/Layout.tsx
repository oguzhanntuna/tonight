import { useDispatch, useSelector } from 'react-redux';
import './Layout.scss'

import { IApplicationState } from './models/interfaces/store/states/application';
import * as AuthActions from './store/actions/auth';

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';
import { useEffect } from 'react';

const Layout = (): JSX.Element => {
  const { checkAuthState } = AuthActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());

  }, [dispatch, checkAuthState]);

  return (
    <div className="layout">
      <Header />
      <Page />
      <Footer />
    </div>
  )
}

export default Layout;
