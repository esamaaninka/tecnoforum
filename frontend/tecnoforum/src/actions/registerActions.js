import { loading, endLoading } from './loginActions';

//Action constants

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

//Async Actions
export const onRegister = (user) => {
  return (dispatch) => {
    let request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    };
    dispatch(loading());
    fetch('/register', request)
      .then((response) => {
		dispatch(endLoading());
        if (response.ok) {
          alert('Register success');
		  dispatch(registerSuccess());
        } else {
          if (response.status === 409) {
            dispatch(registerFailed('Register failed. Is username already in use?'));
          } else {
            dispatch(registerFailed('Server responded with status:', response.status));
          }
        }
      })
      .catch((error) => {
		dispatch(endLoading());
        dispatch(registerFailed('Server responded with ana error', error));
      });
  };
};
// Action Creators

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    error: error,
  };
};