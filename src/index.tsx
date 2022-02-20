import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';

import { IApplicationState } from './models/interfaces/store/states/application';
import { eventsReducer } from './store/reducers/events';
import { cartReducer } from './store/reducers/cart';
import { favoritesReducer } from './store/reducers/favorites';
import { authReducer } from './store/reducers/auth';
import { toastMessageReducer } from './store/reducers/toastMessage';
import { ordersReducer } from './store/reducers/orders';
import { thisWeekEventsReducer } from './store/reducers/thisWeekEvents';
import { recentlyAddedEventsReducer } from './store/reducers/recentlyAddedEvents';
import Layout from './Layout';

const rootReducer = combineReducers<IApplicationState>({
  events: eventsReducer,
  cart: cartReducer,
  favorites: favoritesReducer,
  auth: authReducer,
  toastMessage: toastMessageReducer,
  orders: ordersReducer,
  thisWeekEvents: thisWeekEventsReducer,
  recentlyAddedEvents: recentlyAddedEventsReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
