import Axios from 'axios';

export default class FetchDataController
{
	static getUserslist (state)
	{
		Axios({
			method: 'GET',
			mode: "cors",
			url: '/api/users',
			responseType: 'json'
		}).then((response) => {
			state.setState({
				list:response.data
			});
		}).catch(error => {
			console.log("Server responded with an error:",error);
		});
	}

	static getUserByName (state, name)
	{
		Axios({
			method: 'GET',
			mode: "cors",
			url: `/api/users/name/${name}`,
			responseType: 'json'
		}).then((response) => {
			state.setState({
				user:response.data
			});
		}).catch(error => {
			console.log("Server responded with an error:",error);
		});
	}
}