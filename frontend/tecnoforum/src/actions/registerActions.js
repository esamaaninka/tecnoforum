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
    fetch('/api/users', request).then((response) => {
		dispatch(endLoading());
        if (response.ok) {
		  dispatch(registerSuccess());
        } else {
          if (response.status === 409) {
            dispatch(registerFailed('Register failed. Is username already in use?'));
          } else {
			response.json().then((data) => {
				dispatch(registerFailed(`Server responded with status: ${data.error}`));
            }).catch((error) => {
			  dispatch(registerFailed(`Server responded with status: ${response.status}`));
            });
          }
        }
      }).catch((error) => {
		dispatch(endLoading());
        dispatch(registerFailed(`Server responded with status: ${error}`));
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