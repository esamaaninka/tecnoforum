import React from 'react';
import { Table } from 'semantic-ui-react';

export default class CategoryRow extends React.Component {
  render() {
    const { categoryName, threads } = this.props.item;
    return (
		<Table.Row>
		  <Table.Cell>{categoryName}</Table.Cell>
		  <Table.Cell textAlign='center'>{threads.length}</Table.Cell>
		  <Table.Cell></Table.Cell>
		</Table.Row>
	  );
  }
}
