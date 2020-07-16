import React from 'react';
import { Table, Item } from 'semantic-ui-react';

export default class ThreadRow extends React.Component {
	render() {
		const { threadName, comments, id, author, user_id, date } = this.props.item;
		return (
			<Table.Row>
				<Table.Cell>
					<Item.Group>
						<Item>
							<Item.Content>
								<Item.Header as='a' href={`/t/${id}`} id={id} onClick={this.props.onClickThread}>
									{threadName}
								</Item.Header>
								<Item.Extra>
									<a href="" id={user_id} onClick={this.props.onClickUser}>{author}</a>/ {date}
								</Item.Extra>
							</Item.Content>
						</Item>
					</Item.Group>
				</Table.Cell>
				<Table.Cell textAlign='center'>{comments ? comments.length : 0}</Table.Cell>
				<Table.Cell textAlign='center'>0</Table.Cell>
			</Table.Row>
		);
  	}
}
