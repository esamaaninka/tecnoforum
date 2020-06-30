import { combineReducers } from 'redux';

import login from './loginReducer';
import contact from './contactReducer';
import register from './registerReducer';
import category from './categoryReducer';

export default combineReducers({
  login,
  contact,
  register,
  category
});
