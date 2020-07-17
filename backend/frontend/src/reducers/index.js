import { combineReducers } from 'redux';

import login from './loginReducer';
import contact from './contactReducer';
import register from './registerReducer';
import category from './categoryReducer';
import thread from './threadReducer';

export default combineReducers({
  login,
  contact,
  register,
  category,
  thread
});
