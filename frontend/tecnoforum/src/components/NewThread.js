import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Spinner from './Spinner';
import { getCategory } from '../actions/categoryActions';
import { newThread } from '../actions/threadActions';
import ThreadForm from './ThreadForm';

class NewThread extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			comment: '',
			titleFail: false,
			commentFail: false
		};
	}

	componentDidMount () {
		if (this.props.category.id !== this.props.id)
			this.props.dispatch(getCategory(this.props.token, this.props.id, false));
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
			categoryName: this.props.category.categoryName
		}

		this.props.dispatch(newThread(this.props.token, thread, this.props.history));
	};

	render() {
		const isLoading = this.props.loading && <Spinner />;
		let categoryName = this.props.category ? this.props.category.categoryName : "Category";
		return (
			<>
				{isLoading}
				<ThreadForm 
					id={this.props.id} 
					categoryName={categoryName} 
					header="New Thread" 
					onChange={this.onChange} 
					onSubmit={this.onSubmit} 
					state={{...this.state}} 
					history={this.props.history} />
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.login.token,
		category: state.category.category,
		loading: state.register.loading,
		error: state.thread.error
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewThread));
