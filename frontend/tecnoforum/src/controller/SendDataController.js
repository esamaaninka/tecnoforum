import Axios from 'axios';

export default class SendDataController
{
	static register (state, newUser)
	{
		Axios({
			method: 'POST',
			mode: "cors",
			url: '/api/users',
			data: {
			fullname: newUser.fullname,
			password: newUser.password,
			email: newUser.email,
			nickname: newUser.nickname
			}
		}).then((response) => {
			console.log(response);
		}).catch(error => {
			console.log("Server responded with an error:",error);
		});
	}
}