import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import './Layout.scss'

import * as AuthActions from './store/actions/auth';
import * as FavoritesActions from './store/actions/favorites';
import * as CartActions from './store/actions/cart';
import * as OrdersActions from './store/actions/orders';

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';
import ToastMessage from './components/toastMessage/toastMessage';

const Layout = (): JSX.Element => {
  const { checkAuthState } = AuthActions;
  const { fetchFavorites } = FavoritesActions;
  const { fetchCart } = CartActions;
  const { fetchOrders } = OrdersActions;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(fetchFavorites());
    dispatch(fetchCart());
    dispatch(fetchOrders());
    
  }, [dispatch, checkAuthState, fetchFavorites, fetchCart, fetchOrders]);

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
