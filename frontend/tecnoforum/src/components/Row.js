import React from 'react';

export default class Row extends React.Component {
	
	render() {
		return (
			<tr>
				<td>{this.props.item.fullname}</td>
				<td>{this.props.item.password}</td>
				<td>{this.props.item.email}</td>
				<td>{this.props.item.nickname}</td>
				<td>{this.props.item.id}</td>
			</tr>
		)
	}				
}