import { combineReducers } from 'redux';

import login from './loginReducer';
import contact from './contactReducer';
import register from './registerReducer';

export default combineReducers({
  login,
  contact,
  register,
});
