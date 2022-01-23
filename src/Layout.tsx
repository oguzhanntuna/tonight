import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Layout.scss'

import * as AuthActions from './store/actions/auth';
import * as FavoritesActions from './store/actions/favorites';

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';
import ToastMessage from './components/toastMessage/ToastMessage';


const Layout = (): JSX.Element => {
  const { checkAuthState } = AuthActions;
  const { fetchFavorites } = FavoritesActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(fetchFavorites());
    
  }, [dispatch, checkAuthState, fetchFavorites]);

  return (
    <div className="layout">
      <ToastMessage />
      <Header />
      <Page />
      <Footer />
    </div>
  )
}

export default Layout;
