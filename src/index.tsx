import React, { Reducer, ReducerState } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import './index.scss';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import eventsReducer from './store/reducers/events';

interface IEventState {
  counter: number;
}

interface IApplicationState {
  events: IEventState
}

const rootReducer = combineReducers<IApplicationState>({
  events: eventsReducer
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
