import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dataReducer from './data';

const rootReducer = combineReducers({
  data: dataReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
