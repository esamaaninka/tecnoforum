import React from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Card, Image, Icon, Table } from 'semantic-ui-react';

class CommentRow extends React.Component {
  render() {
	const { comment, id, author, user_id, date, thread_id } = this.props.item;
	const isThread = this.props.isThread;
	const tUrl = `/t/${thread_id}/`;
	const onClickCommentModify = this.props.onClickCommentModify;
	let editAndRemove = "";
	if ( this.props.isLogged && ( this.props.user.userType === "admin" || this.props.user.id === user_id ) )
	{
		if ( !isThread )
			editAndRemove = <><a href="">Remove</a> / <a href={`${tUrl}edit-comment/${id}`} onClick={onClickCommentModify}>Edit</a> /</>;
		else
			editAndRemove = <><a href="">Remove</a> / <a href={`${tUrl}edit-thread`} onClick={onClickCommentModify}>Edit</a> /</>;
	}
    return (
      <Segment>
		  <Table basic='very' celled>
			  <Table.Body>
				  <Table.Row>
					  <Table.Cell collapsing rowSpan='2'>
					  	<Card>
							{/* <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} /> */}
							<Card.Content>
							<Card.Header><a href="">{author}</a></Card.Header>
							<Card.Meta>
								{/* <span className='date'>Joined in 2015</span> */}
							</Card.Meta>
							<Card.Description>
								{/* Matthew is a musician living in Nashville. */}
							</Card.Description>
							</Card.Content>
							<Card.Content extra>
							{/* <a>
								<Icon name='user' />
								22 Friends
							</a> */}
							</Card.Content>
						</Card>
					  </Table.Cell>
					  <Table.Cell verticalAlign='top'>
						  <div style={{opacity:.45,paddingBottom:"10px"}}>
							<div style={{right: "15px",position:"absolute"}}>
							{editAndRemove} <a href={`${tUrl}new-comment/${isThread ? "thread" : id}`} onClick={onClickCommentModify}>Reply</a>
							</div>
						 	Created {date} {/* - Modified {modified_date}*/}
						  </div>
						  {comment}
					  </Table.Cell>
				  </Table.Row>
			  </Table.Body>
		  </Table>
	  </Segment>
    );
  }
}

export default withRouter(CommentRow);
