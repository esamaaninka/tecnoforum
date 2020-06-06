import React from 'react';
import Row from './Row'

export default class ListAllUsers extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			list:[]
		}
	}

	getUserslist = () =>
	{
		let request = {
			method:"GET",
			mode:"cors",
			headers:{"Content-type":"application/json"}
		}
		fetch("/api/users",request).then(response => {
			if(response.ok) {
				response.json().then(data => {
					this.setState({
						list:data
					})
				}).catch(error => {
					console.log("Failed to parse JSON data:",error)
				})
			} else {
				console.log("Server responded with status:",response.status) 
			}
		}).catch(error => {
			console.log("Server responded with an error:",error);
		})
	}

	componentDidMount() {
		this.getUserslist();
	}

	render() {
		let users = this.state.list.map((user,index) => {
			return <Row key={user.id} item={user}/>
		})
		return(
			<table>
				<thead>
				<tr>
					<th>Fullname</th>
					<th>Password</th>
					<th>Email</th>
					<th>Nickname</th>
					<th>Id</th>
				</tr>
				</thead>
				<tbody>
				{users}
				</tbody>
			</table>
		)
	}

}