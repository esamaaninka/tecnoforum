import React from 'react';
import { Table } from 'semantic-ui-react';

export default class CategoryRow extends React.Component {
  render() {
    const { categoryName, threads, id } = this.props.item;
    return (
		<Table.Row>
		  <Table.Cell selectable><a href="" id={id} onClick={this.props.onClick}>{categoryName}</a></Table.Cell>
		  <Table.Cell textAlign='center'>{threads ? threads.length : 0}</Table.Cell>
		  <Table.Cell></Table.Cell>
		</Table.Row>
	  );
  }
}
