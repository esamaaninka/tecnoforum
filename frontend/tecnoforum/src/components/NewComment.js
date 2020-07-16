import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from './Spinner';
import { getThread, newComment } from '../actions/threadActions';
import CommentForm from './CommentForm';

class NewComment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			comment: '',
			commentFail: false,
			threadLoaded: false
		};
	}

	componentDidMount () {
		this.props.dispatch(getThread(this.props.token, this.props.id, true));
	}

	componentDidUpdate(prevProps) {
		if (this.props.thread !== prevProps.thread && this.props.thread !== null && this.state.threadLoaded === false) {
			let state = {};
			state.threadLoaded = true;
			this.setState(state);
		}
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
			thread_id: this.props.thread.id
		}

		this.props.dispatch(newComment(this.props.token, comment, this.props.history));
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
				{this.state.threadLoaded && <CommentForm 
					category={this.props.category}
					thread={this.props.thread}
					header="New Comment" 
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
		loading: state.register.loading,
		error: state.thread.error
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewComment));
