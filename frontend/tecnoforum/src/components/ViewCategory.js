import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Header, Button, Icon, Breadcrumb } from 'semantic-ui-react';

import ThreadRow from './ThreadRow';
import Spinner from './Spinner';
import { getCategory, getThreads, clearCategories } from '../actions/categoryActions';

class ViewCategory extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: 1
		};
	}

	componentDidMount () {
		let state = {};
		state.page = this.props.page ? this.props.page : 1;
		this.props.dispatch(getCategory(this.props.token, this.props.id));
		this.props.dispatch(getThreads(this.props.token, this.props.id, state.page));
		this.setState(state);
	}

	componentWillUnmount () {
		this.props.dispatch(clearCategories());
	}

	onClickThread = (event) => {
		event.preventDefault();
		this.props.history.push(`/t/${event.target.id}`);
	};

	onClickUser = (event) => {
		event.preventDefault();
		
	};

	onClickBreadcrum = (event) => {
		event.preventDefault();
		this.props.history.push(event.target.getAttribute("href"));
	}

	handlePaginationChange = (e, { activePage }) => {
		this.props.history.replace(`/c/${this.props.id}/page-${activePage}`);
		this.props.dispatch(getThreads(this.props.token, this.props.id, activePage));
		let state = {};
		state.page = activePage;
		this.setState(state);
	}

	render() {
		const isLoading = this.props.loading && <Spinner />;
		let threads = this.props.threads && this.props.threads.docs.map((thread) => {
			return <ThreadRow key={thread.id} item={thread} onClickThread={this.onClickThread} onClickUser={this.onClickUser} />;
		});
		let name = this.props.category ? this.props.category.categoryName : "Category";
		let pagination = this.props.threads && <Pagination size='mini'
			defaultActivePage={this.state.page}
			totalPages={this.props.threads.pages}
			onPageChange={this.handlePaginationChange} />
   		return (
			<div>
				{isLoading}
				<Breadcrumb size='tiny'>
					<Breadcrumb.Section href={`/`} onClick={this.onClickBreadcrum}>Home</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>{name}</Breadcrumb.Section>
				</Breadcrumb>
				<Table basic='very'>
					<Table.Body>
						<Table.Row>
							<Table.Cell>
								<Header as='h1'>{name}</Header>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>
								{pagination}
							</Table.Cell>
							<Table.Cell collapsing>
								<Button 
									disabled={!this.props.isLogged} 
									icon 
									labelPosition='right' 
									onClick={() => this.props.history.push(`/c/${this.props.id}/new-thread/`)}>
										New Thread 
										<Icon name="plus" />
								</Button>
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
	  threads: state.category.threads
	};
};
  
const mapDispatchToProps = (dispatch) => ({
	dispatch
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewCategory));
