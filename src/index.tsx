import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { IEventShowcaseEvent } from './models/interfaces/eventShowcase/event';

import './index.scss';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import { eventsReducer } from './store/reducers/events';
import { cartReducer } from './store/reducers/cart';

interface IEventsState {
  availableEvents: Array<IEventShowcaseEvent>;
}

interface ICartState {
  cartItems: Array<IEventShowcaseEvent | undefined>;
}

interface IApplicationState {
  events: IEventsState;
  cart: ICartState;
}

const rootReducer = combineReducers<IApplicationState>({
  events: eventsReducer,
  cart: cartReducer
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
