import React from 'react';
import { Table } from 'semantic-ui-react';

export default class Row extends React.Component {
  render() {
    const { fullname, password, email, nickname, id } = this.props.item;
    return (
      <Table.Row>
        <Table.Cell>{fullname}</Table.Cell>
        <Table.Cell>{password}</Table.Cell>
        <Table.Cell>{email}</Table.Cell>
        <Table.Cell>{nickname}</Table.Cell>
        <Table.Cell>{id}</Table.Cell>
      </Table.Row>
    );
  }
}
