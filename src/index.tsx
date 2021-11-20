import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { IApplicationState } from './models/interfaces/store/states/application';
import './index.scss';

import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { eventsReducer } from './store/reducers/events';
import { cartReducer } from './store/reducers/cart';
import { favoritesReducer } from './store/reducers/favorites';

const rootReducer = combineReducers<IApplicationState>({
  events: eventsReducer,
  cart: cartReducer,
  favorites: favoritesReducer
})

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
