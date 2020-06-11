import Axios from 'axios';

export const ON_REGISTER = 'ON_REGISTER';

export const onRegister = (newUser) => {
  return (dispatch) => {
    Axios({
      method: 'POST',
      mode: 'cors',
      url: '/api/users',
      data: {
        fullname: newUser.fullname,
        password: newUser.password,
        email: newUser.email,
        nickname: newUser.nickname,
      },
    })
      .then((response) => {
        console.log(response);
        dispatch(onRegisterSuccesss(response));
      })
      .catch((error) => {
        console.log('Server responded with an error:', error);
      });
  };
};

const onRegisterSuccesss = (data) => ({
  type: ON_REGISTER,
  data,
});
