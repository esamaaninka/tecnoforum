import React from 'react';
import Row from './Row';
import { Table } from 'semantic-ui-react';
import DataFetchController from '../controller/DataFetchController';
import Spinner from './Spinner';

export default class ListAllUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    DataFetchController.getUserslist(this);
  }

  render() {
    if (this.state.list <= this.state.list.length) return <Spinner />;
    let users = this.state.list.map((user, index) => {
      return <Row key={user.id} item={user} />;
    });
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Fullname</Table.HeaderCell>
            <Table.HeaderCell>Password</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Nickname</Table.HeaderCell>
            <Table.HeaderCell>Id</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{users}</Table.Body>
      </Table>
    );
  }
}
