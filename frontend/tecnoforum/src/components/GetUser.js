import React from 'react';
import Row from './Row';
import { Table } from 'semantic-ui-react';
import FetchDataController from '../controller/FetchDataController';
import Spinner from './Spinner';

export default class GetUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:null,
    };
  }

  componentDidMount() {
    FetchDataController.getUserByName(this, this.props.name);
  }

  render() {
    if (this.state.user === null) return <Spinner />;
    // let users = this.state.list.map((user, index) => {
    //   return <Row item={user} />;
    // });
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
        <Table.Body><Row key={this.state.user.id} item={this.state.user} /></Table.Body>
      </Table>
    );
  }
}
