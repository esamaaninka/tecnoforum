import {
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILED,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILED,
  REMOVE_CONTACT_SUCCESS,
  REMOVE_CONTACT_FAILED,
  EDIT_CONTACT_SUCCESS,
  EDIT_CONTACT_FAILED,
  CLEAR_CONTACTREDUCER_STATE,
  CHANGE_MODE,
} from '../actions/contactActions';

const getInitialStateFromStorage = () => {
  if (sessionStorage.getItem('contactstate')) {
    let contactstate = JSON.parse(sessionStorage.getItem('contactstate'));
    return contactstate;
  } else {
    return {
      list: [],
      mode: 'Add',
      contact: {},
      error: '',
    };
  }
};

const saveToStorage = (state) => {
  sessionStorage.setItem('contactstate', JSON.stringify(state));
};

const initialState = getInitialStateFromStorage();

const contactReducer = (state = initialState, action) => {
  console.log('ContactReducer, action:', action);
  let tempState = {};
  switch (action.type) {
    case FETCH_CONTACTS_SUCCESS:
      tempState = {
        ...state,
        list: action.list,
        error: '',
      };
      saveToStorage(tempState);
      return tempState;
    case FETCH_CONTACTS_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;
    case ADD_CONTACT_SUCCESS:
      tempState = {
        ...state,
        error: '',
      };
      saveToStorage(tempState);
      return tempState;
    case ADD_CONTACT_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;
    case REMOVE_CONTACT_SUCCESS:
      tempState = {
        ...state,
        error: '',
      };
      saveToStorage(tempState);
      return tempState;
    case REMOVE_CONTACT_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;
    case EDIT_CONTACT_SUCCESS:
      tempState = {
        ...state,
        error: '',
      };
      saveToStorage(tempState);
      return tempState;
    case EDIT_CONTACT_FAILED:
      tempState = {
        ...state,
        error: action.error,
      };
      saveToStorage(tempState);
      return tempState;
    case CLEAR_CONTACTREDUCER_STATE:
      tempState = {
        list: [],
        error: '',
        mode: 'Add',
        contact: {},
      };
      saveToStorage(tempState);
      return tempState;
    case CHANGE_MODE:
      tempState = {
        ...state,
        error: '',
        mode: action.mode,
        contact: action.contact,
      };
      saveToStorage(tempState);
      return tempState;
    default:
      return state;
  }
};

export default contactReducer;
