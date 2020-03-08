import {combineReducers} from 'redux';
import laundryReducer from './laundry';
import userReducer from './user';

const reducers = combineReducers({
  laundry: laundryReducer,
  user: userReducer,
});

export default reducers;
