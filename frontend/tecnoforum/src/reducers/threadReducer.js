import {
	FETCH_THREAD_SUCCESS,
	FETCH_THREAD_FAILED,
	FETCH_COMMENTS_SUCCESS,
	FETCH_COMMENTS_FAILED,
	ADD_THREAD_SUCCESS,
	ADD_THREAD_FAILED,
	REMOVE_THREAD_SUCCESS,
	REMOVE_THREAD_FAILED,
	EDIT_THREAD_SUCCESS,
	EDIT_THREAD_FAILED,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILED,
	REMOVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_FAILED,
	EDIT_COMMENT_SUCCESS,
	EDIT_COMMENT_FAILED,
	CLEAR_THREAD_AND_COMMENTS
} from '../actions/threadActions';
  
const getInitialStateFromStorage = () => {
	if (sessionStorage.getItem('threadstate')) {
	  let threadstate = JSON.parse(sessionStorage.getItem('threadstate'));
	  return threadstate;
	} else {
	  return {
		thread: null,
		comments: null,
		error: '',
	  };
	}
};
  
const saveToStorage = (state) => {
	sessionStorage.setItem('threadstate', JSON.stringify(state));
};
  
const initialState = getInitialStateFromStorage();
  
const threadReducer = (state = initialState, action) => {
	console.log('ThreadReducer, action:', action);
	let tempState = {};
	switch (action.type) {
	  case FETCH_THREAD_SUCCESS:
		tempState = {
			...state,
			thread: action.thread,
			error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case FETCH_THREAD_FAILED:
		tempState = {
			...state,
			error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case FETCH_COMMENTS_SUCCESS:
		tempState = {
		  ...state,
		  comments: action.comments,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case FETCH_COMMENTS_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case ADD_THREAD_SUCCESS:
		tempState = {
			...state,
			error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case ADD_THREAD_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case REMOVE_THREAD_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case REMOVE_THREAD_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case EDIT_THREAD_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case EDIT_THREAD_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case ADD_COMMENT_SUCCESS:
		tempState = {
			...state,
			error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case ADD_COMMENT_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case REMOVE_COMMENT_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case REMOVE_COMMENT_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case EDIT_COMMENT_SUCCESS:
		tempState = {
		  ...state,
		  error: '',
		};
		saveToStorage(tempState);
		return tempState;
	  case EDIT_COMMENT_FAILED:
		tempState = {
		  ...state,
		  error: action.error,
		};
		saveToStorage(tempState);
		return tempState;
	  case CLEAR_THREAD_AND_COMMENTS:
		tempState = {
			...state,
			comments: null,
			thread: null,
			error: ''
		}
		saveToStorage(tempState);
		return tempState;
	  default:
		return state;
	}
};
  
export default threadReducer;