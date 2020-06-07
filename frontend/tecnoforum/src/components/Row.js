import React from 'react';
import {Table} from 'semantic-ui-react';

export default class Row extends React.Component {
	
	render() {
		return (
			<Table.Row>
				<Table.Cell>{this.props.item.fullname}</Table.Cell>
				<Table.Cell>{this.props.item.password}</Table.Cell>
				<Table.Cell>{this.props.item.email}</Table.Cell>
				<Table.Cell>{this.props.item.nickname}</Table.Cell>
				<Table.Cell>{this.props.item.id}</Table.Cell>
			</Table.Row>
		)
	}				
}