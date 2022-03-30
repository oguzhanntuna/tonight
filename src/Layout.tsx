import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Layout.scss'

import { useDeviceType } from './customHooks/useDeviceType';
import { useLoggedIn } from './customHooks/useLoggedIn';
import * as AuthActions from './store/actions/auth';
import * as FavoritesActions from './store/actions/favorites';
import * as CartActions from './store/actions/cart';
import * as OrdersActions from './store/actions/orders';

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';
import ToastMessage from './components/toastMessage/toastMessage';
import BottomNavBar from './components/bottomNavBar/bottomNavBar';

const Layout = (): JSX.Element => {
  const { checkAuthState } = AuthActions;
  const { fetchFavorites } = FavoritesActions;
  const { fetchCart } = CartActions;
  const { fetchOrders } = OrdersActions;
  const dispatch = useDispatch();
  const deviceType = useDeviceType();
  const location = useLocation();
  const isLoggedIn = useLoggedIn();

  const isCartPageActive = location.pathname.includes('/cart');
  const isEventDetailPageActive = location.pathname.split('/').length === 3;

  useEffect(() => {
    dispatch(checkAuthState());

    if (isLoggedIn) {
      dispatch(fetchFavorites());
      dispatch(fetchOrders());
      
      if (!isCartPageActive) {
        dispatch(fetchCart());
      }
    }
  }, [isLoggedIn, dispatch, checkAuthState, fetchFavorites, fetchCart, fetchOrders]);

  useEffect(() => {
    if (isCartPageActive) {
      dispatch(fetchCart());
    }
  }, [isCartPageActive, dispatch, fetchCart]);

  return (
    <div className={`layout ${isEventDetailPageActive ? 'layout-paddingBottom' : ''}`}>
      <ToastMessage classname={isEventDetailPageActive ? 'eventDetail' : isCartPageActive ? 'cart' : ''} />
      <Header />
      <Page />
      { !isCartPageActive && !isEventDetailPageActive && deviceType === 'mobile' && <BottomNavBar /> }
      <Footer /> 
    </div>
  )
}

export default Layout;
