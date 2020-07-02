import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Pagination, Header, Divider, Breadcrumb } from 'semantic-ui-react';
import CommentRow from './CommentRow';

class ViewThread extends React.Component {
  render() {
    return (
		<>
			<Table basic='very'>
				<Table.Body>
					<Table.Cell>
						<Header as='h2'>Title of this thread</Header>
						<Breadcrumb size='tiny'>
							<Breadcrumb.Section link>Category</Breadcrumb.Section>
							<Breadcrumb.Divider />
							<Breadcrumb.Section active>Thread</Breadcrumb.Section>
						</Breadcrumb>
					</Table.Cell>
					<Table.Cell collapsing>
						<Pagination defaultActivePage={5} totalPages={10} />
					</Table.Cell>
				</Table.Body>
			</Table>
			<CommentRow/>
			<CommentRow/>
		</>
    );
  }
}

export default withRouter(ViewThread);
