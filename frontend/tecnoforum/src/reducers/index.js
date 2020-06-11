import { combineReducers } from 'redux';

import example from './example-reducer';
import example2 from './example2-reducer';

export default combineReducers({
  example,
  example2,
});
