import bookWidget from './bookWidget';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  bookWidget : bookWidget
});

const reducerGateway = (state: any, action: any) => {
  if (action.type === 'RESET') {
    state = {};
  }
  return rootReducer(state, action);
};

export default reducerGateway;
