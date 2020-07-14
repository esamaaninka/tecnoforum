import {
  LOADING,
  END_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from '../actions/loginActions';

/*
state
{
	token:"",
	isLogged:false,
	loading:false,
	error:""
}
*/

const getInitialStateFromStorage = () => {
  if (sessionStorage.getItem('loginstate')) {
	let loginstate = JSON.parse(sessionStorage.getItem('loginstate'));
	loginstate.error = '';
    return loginstate;
  } else {
    return {
	  token: '',
	  user: {},
      isLogged: false,
      loading: false,
      error: '',
    };
  }
};

const saveToStorage = (state) => {
  sessionStorage.setItem('loginstate', JSON.stringify(state));
};

const initialState = getInitialStateFromStorage();

const loginReducer = (state = initialState, action) => {
  console.log('LoginReducer, action:', action);
  let tempState = {};
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case END_LOADING:
      return {
        ...state,
        loading: false,
        error: '',
      };
    case LOGIN_SUCCESS:
      tempState = {
        isLogged: true,
		token: action.data.token,
		user: action.data.user,
        error: '',
        loading: false,
      };
      saveToStorage(tempState);
      return tempState;
    case LOGIN_FAILED:
      tempState = {
        ...state,
        error: action.error,
        loading: false,
      };
      saveToStorage(tempState);
      return tempState;
    case LOGOUT_SUCCESS:
      tempState = {
        isLogged: false,
		token: '',
		user: {},
        error: '',
        loading: false,
      };
      saveToStorage(tempState);
      return tempState;
    case LOGOUT_FAILED:
      tempState = {
        isLogged: false,
        token: '',
		user: {},
        error: action.error,
        loading: false,
      };
      saveToStorage(tempState);
      return tempState;
    default:
      return state;
  }
};

export default loginReducer;
