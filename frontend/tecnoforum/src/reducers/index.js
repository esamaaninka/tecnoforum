import { combineReducers } from 'redux';

import login from './loginReducer';
import contact from './contactReducer';

export default combineReducers({
  login,
  contact,
});
