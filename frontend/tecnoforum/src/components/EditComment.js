import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from './Spinner';
import { getThread, getComment, editComment } from '../actions/threadActions';
import CommentForm from './CommentForm';

class EditComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			commentFail: false,
			threadLoaded: false,
			commentLoaded: false
		};
	}

	componentDidMount () {
		this.props.dispatch(getThread(this.props.token, this.props.id, true));
		this.props.dispatch(getComment(this.props.token, this.props.comment_id));
	}

	componentDidUpdate(prevProps) {
		let state = {};
		let stateUpdate = false;

		if (this.state.threadLoaded === false && this.props.thread !== null && this.props.thread !== prevProps.thread) {
			state.threadLoaded = true;
			stateUpdate = true;
		}
		if (this.state.commentLoaded === false && this.props.comment !== null && this.props.comment !== prevProps.comment) {
			state.commentLoaded = true;
			state.comment = this.props.comment.comment;
			stateUpdate = true;
		}

		if (stateUpdate)
			this.setState(state);
	}

	onChange = (event) => {
		let state = {};
		state[event.target.name] = event.target.value;
		state[`${event.target.name}Fail`] = false;
		this.setState(state);
	};

	onSubmit = (event) => {
		event.preventDefault();

		if (this.state.comment.length === 0)
		{
			let state = {};
			state.commentFail = true;
			this.setState(state);
			return;
		}
		
		const comment = {
			comment: this.state.comment,
			id: this.props.comment_id,
			thread_id: this.props.thread.id
		}

		this.props.dispatch(editComment(this.props.token, comment, this.props.history));
	};

	onClickBreadcrum = (event) => {
		event.preventDefault();
		this.props.history.push(event.target.getAttribute("href"));
	}

	render() {
		const isLoading = this.props.loading && <Spinner />;
		return (
			<>
				{isLoading}
				{this.state.threadLoaded && this.state.commentLoaded && <CommentForm 
					category={this.props.category}
					thread={this.props.thread}
					header="Edit Comment" 
					onChange={this.onChange} 
					onSubmit={this.onSubmit} 
					state={{...this.state}} 
					history={this.props.history} />
				}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.login.token,
		category: state.category.category,
		thread: state.thread.thread,
		comment: state.thread.comment,
		loading: state.register.loading,
		error: state.thread.error
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditComment));
