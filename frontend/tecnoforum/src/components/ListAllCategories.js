import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

import CategoryRow from './CategoryRow';
import Spinner from './Spinner';
import { getCategories } from '../actions/categoryActions';

class ListAllCategories extends React.Component {
  
  componentDidMount (){
    this.props.dispatch(getCategories(this.props.token));
  }

  onClick = (event) => {
	// event.nativeEvent.stopImmediatePropagation();
	event.preventDefault();
	this.props.history.push(event.target.getAttribute("href"));
  };
  
  render() {
	const isLoading = this.props.loading && <Spinner />;
	let categories = this.props.categories.map((category) => {
		return <CategoryRow key={category.id} item={category} onClick={this.onClick} />;
	});
    return (
      <div>
        {isLoading}
        <Table basic='very' striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Category</Table.HeaderCell>
			  <Table.HeaderCell collapsing>Threads</Table.HeaderCell>
              <Table.HeaderCell textAlign='right'>Latests</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
		  <Table.Body>{categories}</Table.Body>
        </Table>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    token: state.login.token,
	categories: state.category.categories
  };
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListAllCategories));