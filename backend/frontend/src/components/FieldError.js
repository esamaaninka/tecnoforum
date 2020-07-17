import React from 'react';
import { Label } from 'semantic-ui-react';

export default class FieldError extends React.Component {
	render() {
		return (
			<Label basic color='red' pointing>
				{this.props.error}
			</Label>
		);
	}
}
