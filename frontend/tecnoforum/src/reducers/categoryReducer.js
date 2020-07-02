import {
	FETCH_CATEGORIES_SUCCESS,
	FETCH_CATEGORIES_FAILED,
	ADD_CATEGORY_SUCCESS,
	ADD_CATEGORY_FAILED,
	REMOVE_CATEGORY_SUCCESS,
	REMOVE_CATEGORY_FAILED,
	EDIT_CATEGORY_SUCCESS,
	EDIT_CATEGORY_FAILED,
  } from '../actions/categoryActions';
  
  const getInitialStateFromStorage = () => {
	if (sessionStorage.getItem('categorystate')) {
	  let categorystate = JSON.parse(sessionStorage.getItem('categorystate'));
	  return categorystate;
	} else {
	  return {
		list: [],
		error: '',
	  };
	}
  };
  
  const saveToStorage = (state) => {
	sessionStorage.setItem('categorystate', JSON.stringify(state));
  };
  
  const initialState = getInitialStateFromStorage();
  
  const categoryReducer = (state = initialState, action) => {
	console.log('CategoryReducer, action:', action);
	let tempState = {};
	switch (action.type) {
	  case FETCH_CATEGORIES_SUCCESS:
		tempState = {
		  ...state,
		  list: action.list,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case FETCH_CATEGORIES_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case ADD_CATEGORY_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case ADD_CATEGORY_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case REMOVE_CATEGORY_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case REMOVE_CATEGORY_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case EDIT_CATEGORY_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case EDIT_CATEGORY_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  default:
		return state;
	}
  };
  
  export default categoryReducer;
  