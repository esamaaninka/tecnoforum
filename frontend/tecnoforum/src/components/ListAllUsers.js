import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import { getContacts } from '../actions/contactActions';
import Row from './Row';
import Spinner from './Spinner';
// import FetchDataController from '../controller/FetchDataController';

class ListAllUsers extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     list: [],
  //   };
  // }

  componentDidMount() {
    // FetchDataController.getContacts(this)
    console.log(this.props);
    getContacts(this);
  }

  render() {
    // if (this.props.list <= this.props.list.length) return <Spinner />;
    let users = this.props.list.map((user) => {
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

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    list: state.contact.list,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   getContacts: () => dispatch(getContacts()),
// });

export default withRouter(connect(mapStateToProps, { getContacts })(ListAllUsers));
