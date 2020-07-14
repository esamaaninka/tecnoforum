import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Breadcrumb, Form, Input, TextArea, Segment, Button } from 'semantic-ui-react';

import Spinner from './Spinner';
import FieldError from './FieldError';
import { getCategory } from '../actions/categoryActions';
import { newThread } from '../actions/threadActions';

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

		if (this.state.title.length === 0)
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

	onClickBreadcrum = (event) => {
		event.preventDefault();
		this.props.history.push(event.target.getAttribute("href"));
	}

	render() {
		const isLoading = this.props.loading && <Spinner />;
		let category = this.props.category ? this.props.category.categoryName : "Category";
		return (
			<div>
				{isLoading}
				<Header as='h2'>New Thread</Header>
				<Breadcrumb size='tiny'>
					<Breadcrumb.Section href={`/`} onClick={this.onClickBreadcrum}>Home</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section href={`/c/${this.props.id}`} onClick={this.onClickBreadcrum}>{category}</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section active>New Thread</Breadcrumb.Section>
				</Breadcrumb>
				<Segment>
					<Form>
						<Form.Field>
							<label>Title</label>
							<input name='title' placeholder='Title' value={this.state.title} onChange={this.onChange} />
							{this.state.titleFail && <FieldError error="Title must not be empty" />}
						</Form.Field>
						<Form.Field>
							<label>Comment</label>
							<textarea name='comment' placeholder='Comment' value={this.state.comment} onChange={this.onChange} />
							{this.state.commentFail && <FieldError error="Comment must not be empty" />}
						</Form.Field>
						<Button content='Submit' onClick={this.onSubmit} />
						<Button content='Preview' />
					</Form>
				</Segment>
			</div>
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
