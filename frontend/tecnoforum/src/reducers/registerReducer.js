import {
	REGISTER_SUCCESS,
	REGISTER_FAILED,
  } from '../actions/registerActions';
  
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
	if (sessionStorage.getItem('registerstate')) {
	  let registerstate = JSON.parse(sessionStorage.getItem('registerstate'));
	  return registerstate;
	} else {
	  return {
		token: '',
		loading: false,
		error: '',
	  };
	}
  };
  
  const saveToStorage = (state) => {
	sessionStorage.setItem('registerstate', JSON.stringify(state));
  };
  
  const initialState = getInitialStateFromStorage();
  
  const registerReducer = (state = initialState, action) => {
	console.log('RegisterReducer, action:', action);
	let tempState = {};
	switch (action.type) {
	  case REGISTER_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		  loading: false,
		};
		saveToStorage(tempState);
		return tempState;
	  case REGISTER_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		  loading: false,
		};
		saveToStorage(tempState);
		return tempState;
	  default:
		return state;
	}
  };
  
  export default registerReducer;
  