import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { getContacts } from '../actions/contactActions';
import Row from './Row';
import Spinner from './Spinner';

class ListAllUsers extends React.Component {
  componentDidMount() {
    this.props.getContacts(this.props.token);
    console.log(this.props);
  }

  render() {
    const isLoading = this.props.loading && <Spinner />;
    let users = this.props.list.map((user) => {
      return <Row key={user.id} item={user} />;
    });
    return (
      <>
        {isLoading}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    list: state.contact.list,
    loading: state.login.loading,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   getContacts: () => dispatch(getContacts()),
// });

export default withRouter(connect(mapStateToProps, { getContacts })(ListAllUsers));
