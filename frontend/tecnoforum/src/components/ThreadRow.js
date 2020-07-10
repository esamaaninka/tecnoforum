import React from 'react';
import { Table } from 'semantic-ui-react';

export default class ThreadRow extends React.Component {
  render() {
    const { threadName, comments, id } = this.props.item;
    return (
		<Table.Row>
		  <Table.Cell selectable><a id={id} /*onClick={this.props.onClick}*/>{threadName}</a></Table.Cell>
		  <Table.Cell textAlign='center'>{comments ? comments.length : 0}</Table.Cell>
		  <Table.Cell textAlign='center'>0</Table.Cell>
		</Table.Row>
	  );
  }
}
