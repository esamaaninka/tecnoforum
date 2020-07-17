import React from 'react';
import { Header, Breadcrumb, Form, Segment, Button } from 'semantic-ui-react';

import FieldError from './FieldError';

export default class ThreadForm extends React.Component {
	onClickBreadcrum = (event) => {
		event.preventDefault();
		this.props.history.push(event.target.getAttribute("href"));
	}

	render() {
		const { titleFail, commentFail, title, comment } = this.props.state;
		return (
			<div>
				<Header as='h2'>{this.props.header}</Header>
				<Breadcrumb size='tiny'>
					<Breadcrumb.Section href={`/`} onClick={this.onClickBreadcrum}>Home</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section href={`/c/${this.props.id}`} onClick={this.onClickBreadcrum}>{this.props.categoryName}</Breadcrumb.Section>
					<Breadcrumb.Divider />
					{this.props.editThread &&
						<React.Fragment>
							<Breadcrumb.Section href={`/t/${this.props.thread_id}`} onClick={this.onClickBreadcrum} content={title} />
							<Breadcrumb.Divider />
						</React.Fragment>}
					<Breadcrumb.Section active>{this.props.header}</Breadcrumb.Section>
				</Breadcrumb>
				<Segment>
					<Form>
						<Form.Field>
							<label>Title</label>
							<input name='title' placeholder='Title' value={title} onChange={this.props.onChange} />
							{titleFail && <FieldError error="Title must not be empty or less than 4 letters" />}
						</Form.Field>
						<Form.Field>
							<label>Comment</label>
							<textarea name='comment' placeholder='Comment' value={comment} onChange={this.props.onChange} />
							{commentFail && <FieldError error="Comment must not be empty" />}
						</Form.Field>
						<Button content='Submit' onClick={this.props.onSubmit} />
						<Button content='Preview' />
					</Form>
				</Segment>
			</div>
		);
	}
}
