import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './Layout.scss'

import { useDeviceType } from './customHooks/useDeviceType';
import { IApplicationState } from './models/interfaces/store/states/application';
import * as AuthActions from './store/actions/auth';
import * as FavoritesActions from './store/actions/favorites';
import * as CartActions from './store/actions/cart';
import * as OrdersActions from './store/actions/orders';

import Header from './components/header/Header';
import Page from './pages/page';
import Footer from './components/footer/Footer';
import ToastMessage from './components/toastMessage/toastMessage';
import NavBar from './components/navBar/navBar';
import Checkout from './components/checkout/Checkout';

const Layout = (): JSX.Element => {
  const { checkAuthState } = AuthActions;
  const { fetchFavorites } = FavoritesActions;
  const { fetchCart } = CartActions;
  const { fetchOrders } = OrdersActions;
  const dispatch = useDispatch();
  const location = useLocation();
  const deviceType = useDeviceType();

  const { cartItems } = useSelector((state: IApplicationState) => state.cart);

  useEffect(() => {
    dispatch(checkAuthState());
    dispatch(fetchFavorites());
    dispatch(fetchCart());
    dispatch(fetchOrders());
    
  }, [dispatch, checkAuthState, fetchFavorites, fetchCart, fetchOrders]);

  const isCartPageActive = location.pathname.includes('/cart');

  return (
    <div className="layout">
      <ToastMessage />
      <Header />
      <Page />
      { isCartPageActive && deviceType === 'mobile' && <Checkout cartItems={cartItems} cartPurchasable={cartItems.length > 0} /> }
      { !isCartPageActive && deviceType === 'mobile' && <NavBar /> }
      { 
        isCartPageActive 
          ? deviceType === 'mobile'
            ? <></>
            : <Footer />
          : <Footer /> 
        }
    </div>
  )
}

export default Layout;
