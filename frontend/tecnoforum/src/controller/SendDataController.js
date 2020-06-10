import Axios from 'axios';

export default class SendDataController
{
	static getUserslist (object)
	{
		Axios({
			method: 'GET',
			mode: "cors",
			url: '/api/users',
			responseType: 'json'
		}).then((response) => {
			object.setState({
				list:response.data
			});
		}).catch(error => {
			console.log("Server responded with an error:",error);
		});
	}
}