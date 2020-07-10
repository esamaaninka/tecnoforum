import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Header, Divider, Breadcrumb, Button, Icon } from 'semantic-ui-react';

import ThreadRow from './ThreadRow';
import Spinner from './Spinner';
import { getThreads } from '../actions/categoryActions';

class ViewCategory extends React.Component {

	componentDidMount () {
		this.props.dispatch(getThreads(this.props.token, this.props.id));
	}

	render() {
		const isLoading = this.props.loading && <Spinner />;
		let threads = this.props.list.map((thread) => {
			return <ThreadRow key={thread.id} item={thread} />;
		});
		let name = this.props.category ? this.props.category.categoryName : "Category";
   		return (
			<div>
				{isLoading}
				<Table basic='very'>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<Header as='h2'>{name}</Header>
								<Breadcrumb size='tiny'>
									<Breadcrumb.Section link onClick={() => this.props.history.push("/")}>Home</Breadcrumb.Section>
									<Breadcrumb.Divider />
									<Breadcrumb.Section active>{name}</Breadcrumb.Section>
								</Breadcrumb>
							</Table.Cell>
							<Table.Cell collapsing>
								<Button disabled={!this.props.isLogged} icon labelPosition='right'>New Thread <Icon name="plus" /></Button>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
				<Table basic='very' striped>
					<Table.Header>
						<Table.Row>
						<Table.HeaderCell>Thread</Table.HeaderCell>
						<Table.HeaderCell textAlign='right' collapsing>Replies</Table.HeaderCell>
						<Table.HeaderCell textAlign='right' collapsing>Views</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>{threads}</Table.Body>
				</Table>
				<Pagination floated="right" size='mini' defaultActivePage={5} totalPages={10} />
			</div>
    	);
	}
}

const mapStateToProps = (state) => {
	return {
	  isLogged: state.login.isLogged,
	  loading: state.login.loading,
	  token: state.login.token,
	  category: state.category.category,
	  list: state.category.list
	};
};
  
const mapDispatchToProps = (dispatch) => ({
	dispatch
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewCategory));
