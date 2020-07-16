import React from 'react';
import { Header, Breadcrumb, Form, Segment, Button } from 'semantic-ui-react';

import FieldError from './FieldError';

export default class CommentForm extends React.Component {
	onClickBreadcrum = (event) => {
		event.preventDefault();
		this.props.history.push(event.target.getAttribute("href"));
	}

	render() {
		const { commentFail, comment } = this.props.state;
		const categoryName = this.props.category ? this.props.category.categoryName : "Category";
		const threadLink = `/t/${this.props.thread.id}`;
		return (
			<div>
				<Header as='h2'>{this.props.header}</Header>
				<Breadcrumb size='tiny'>
					<Breadcrumb.Section href={`/`} onClick={this.onClickBreadcrum}>Home</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section href={`/c/${this.props.thread.category_id}`} onClick={this.onClickBreadcrum}>{categoryName}</Breadcrumb.Section>
					<Breadcrumb.Divider />
					<Breadcrumb.Section href={threadLink} onClick={this.onClickBreadcrum}>{this.props.thread.threadName}</Breadcrumb.Section>
					<Breadcrumb.Divider />
					{this.props.editComment &&
						<React.Fragment>
							<Breadcrumb.Section href={`${threadLink}/`} onClick={this.onClickBreadcrum} content="" />
							<Breadcrumb.Divider />
						</React.Fragment>}
					<Breadcrumb.Section active>{this.props.header}</Breadcrumb.Section>
				</Breadcrumb>
				<Segment>
					<Form>
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
