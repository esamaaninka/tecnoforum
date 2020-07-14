import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Header, Button, Breadcrumb, Icon } from 'semantic-ui-react';

import CommentRow from './CommentRow';
import Spinner from './Spinner';
import { getThread, getComments, clearThreadAndComments } from '../actions/threadActions';

class ViewThread extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: 1
		};
	}

	componentDidMount () {
		let state = {};
		state.page = this.props.page ? this.props.page : 1;
		this.props.dispatch(getThread(this.props.token, this.props.id, true));
		this.props.dispatch(getComments(this.props.token, this.props.id, state.page));
		this.setState(state);
	}

	componentWillUnmount () {
		this.props.dispatch(clearThreadAndComments());
	}

	onClickBreadcrum = (event) => {
		event.preventDefault();
		this.props.history.push(event.target.getAttribute("href"));
	}

	handlePaginationChange = (e, { activePage }) => {
		this.props.history.replace(`/t/${this.props.id}/page-${activePage}`);
		this.props.dispatch(getComments(this.props.token, this.props.id, activePage));
		let state = {};
		state.page = activePage;
		this.setState(state);
	}

  render() {
	const isLoading = this.props.loading && <Spinner />;
	let categoryLoaded = this.props.category && this.props.thread && this.props.thread.category_id === this.props.category.id;
	let categoryID = categoryLoaded ? this.props.thread.category_id : 0;
	let categoryName = categoryLoaded ? this.props.category.categoryName : "Category";
	let threadName = this.props.thread ? this.props.thread.threadName : "Thread";
	let comments = this.props.comments && this.props.comments.docs.map((comment) => {
		return <CommentRow key={comment.id} item={comment} isLogged={this.props.isLogged} user={this.props.user} />;
	});
	let page = this.props.page ? this.props.page : 1;
	let pagination = this.props.comments && <Pagination size='mini' 
		defaultActivePage={page} 
		totalPages={this.props.comments.pages} 
		onPageChange={this.handlePaginationChange} />
	let threadComment = {};
	if ( this.props.thread ) 
	{
		threadComment = {
		comment: this.props.thread.description,
		author: this.props.thread.author,
		id: this.props.thread.id,
		user_id: this.props.thread.user_id,
		date: this.props.thread.date};
	}
    return (
		<div>
			{isLoading}
			<Breadcrumb size='tiny'>
				<Breadcrumb.Section href={`/`} onClick={this.onClickBreadcrum}>Home</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section href={`/c/${categoryID}`} onClick={this.onClickBreadcrum}>{categoryName}</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section active>{threadName}</Breadcrumb.Section>
			</Breadcrumb>
			<Table basic='very'>
				<Table.Body>
					<Table.Row>
						<Table.Cell>
							<Header as='h1'>{threadName}</Header>
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
								onClick={() => this.props.history.push(`/t/${this.props.id}/new-comment/`)}>
									New Comment 
									<Icon name="plus" />
							</Button>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table>
			{this.state.page === 1 && threadComment && 
				<CommentRow item={threadComment} isLogged={this.props.isLogged} user={this.props.user} />}
			{comments}
		</div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
	  isLogged: state.login.isLogged,
	  token: state.login.token,
	  loading: state.login.loading,
	  user: state.login.user,
	  category: state.category.category,
	  thread: state.thread.thread,
	  comments: state.thread.comments
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewThread));
