import { combineReducers, createStore } from 'redux';

import reducers from './Reducers'

const store = createStore(
  combineReducers({
  ...reducers
  })
);

export { store }
