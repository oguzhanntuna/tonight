import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Layout.scss'

import { useDeviceType } from './customHooks/useDeviceType';
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
  const location = useLocation();
  const deviceType = useDeviceType();

  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(fetchFavorites());
    dispatch(fetchCart());
    dispatch(fetchOrders());
    
  }, [dispatch, checkAuthState, fetchFavorites, fetchCart, fetchOrders]);

  const isCartPageActive = location.pathname.includes('/cart');
  const isEventDetailPageActive = location.pathname.split('/').length === 3;

  useEffect(() => {
    console.log(isEventDetailPageActive)
  }, [isEventDetailPageActive])

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
