import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from './Spinner';
import { getThread, editThread } from '../actions/threadActions';
import ThreadForm from './ThreadForm';

class EditThread extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			comment: '',
			titleFail: false,
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
			state.title = this.props.thread.threadName;
			state.comment = this.props.thread.description;
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
		let state = {};
		let errors = false;

		if (this.state.title.length === 0 || this.state.title.length < 4 )
		{
			state.titleFail = true;
			errors = true;
		}
		if (this.state.comment.length === 0)
		{
			state.commentFail = true;
			errors = true;
		}
		
		if (errors)
		{
			this.setState(state);
			return;
		}
		
		let thread = {
			threadName: this.state.title,
			description: this.state.comment,
			id: this.props.thread.id
		}

		this.props.dispatch(editThread(this.props.token, thread, this.props.history));
	};

	render() {
		const isLoading = this.props.loading && <Spinner />;
		let categoryName = this.props.category ? this.props.category.categoryName : "Category";
		return (
			<>
				{isLoading}
				{this.state.threadLoaded && <ThreadForm 
					id={this.props.category.id} 
					thread_id={this.props.thread.id}
					categoryName={categoryName}
					header="Edit Thread" 
					onChange={this.onChange} 
					onSubmit={this.onSubmit} 
					state={{...this.state}} 
					editThread={true}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditThread));
