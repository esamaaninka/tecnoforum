import React from 'react';
import { Table, Item } from 'semantic-ui-react';

export default class CategoryRow extends React.Component {
  render() {
    const { categoryName, threads, id, description } = this.props.item;
    return (
		<Table.Row>
		  <Table.Cell>
		  	  <Item.Group>
				<Item>
					<Item.Content>
						<Item.Header as='a' href={`/c/${id}`} onClick={this.props.onClick}>
							{categoryName}
						</Item.Header>
						<Item.Extra>
							{description}
						</Item.Extra>
					</Item.Content>
				</Item>
			  </Item.Group>
		  </Table.Cell>
		  <Table.Cell textAlign='center'>
			  {threads ? threads.length : 0}
		  </Table.Cell>
		  <Table.Cell></Table.Cell>
		</Table.Row>
	  );
  }
}
