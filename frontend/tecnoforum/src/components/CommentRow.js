import React from 'react';
import { withRouter } from 'react-router-dom';
import { Segment, Menu, Card, Image, Icon, Table, Divider } from 'semantic-ui-react';

class CommentRow extends React.Component {
  render() {
    return (
      <Segment>
		  <Table basic='very' celled>
			  <Table.Body>
				  <Table.Row>
					  <Table.Cell collapsing rowSpan='2'>
					  	<Card>
							<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
							<Card.Content>
							<Card.Header>Matthew</Card.Header>
							<Card.Meta>
								<span className='date'>Joined in 2015</span>
							</Card.Meta>
							<Card.Description>
								Matthew is a musician living in Nashville.
							</Card.Description>
							</Card.Content>
							<Card.Content extra>
							<a>
								<Icon name='user' />
								22 Friends
							</a>
							</Card.Content>
						</Card>
					  </Table.Cell>
					  <Table.Cell verticalAlign='top'>
						  <Segment vertical style={{'padding-bottom': '40px'}}>
						  <Menu floated='right' text style={{opacity:.45}} size='small'>
							<Menu.Item>Created 01/07/2020 - Modified 01/07/2020</Menu.Item>
							<Menu.Item
								name='reply'
								active='true'
								onClick={() => {}}
								/>
							<Menu.Item
								name='Edit'
								active='false'
								onClick={() => {}}
								/>
							<Menu.Item
								name='Remove'
								active='false'
								onClick={() => {}}
								/>
						  </Menu>
						  </Segment>
						  <Segment vertical>
						  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						  Vivamus quis eros ac ipsum sodales gravida in et purus. 
						  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
						  Vivamus a rhoncus purus. Ut volutpat ligula ornare velit faucibus cursus. 
						  Sed ultricies nunc eget metus pretium, in tristique nibh lacinia. Nam vitae 
						  ipsum et erat eleifend tincidunt vel at nibh. Mauris sapien risus, ultricies 
						  sed aliquet eget, tincidunt non turpis. Maecenas eu nisi justo. Proin in risus 
						  gravida, tincidunt ligula nec, semper eros. Integer vel magna vel dui molestie 
						  ullamcorper a non ligula. Nunc lacinia purus ac leo blandit, in mollis elit 
						  molestie. Aenean pulvinar quis mauris ac ullamcorper. Nullam placerat sodales 
						  tellus, quis viverra est ullamcorper ut.
						  
						  Nunc mattis purus nulla, vitae varius ligula sodales ut. Maecenas dictum, tellus 
						  lacinia maximus lobortis, nunc neque dictum nulla, at venenatis turpis neque eu 
						  lacus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur 
						  ridiculus mus. Vestibulum nec euismod diam. Phasellus eget rutrum magna. Donec 
						  venenatis massa in massa fermentum pulvinar. Quisque eros ex, cursus nec mauris 
						  vel, hendrerit lobortis nibh. Aliquam dignissim et nulla vel auctor.</Segment>
					  </Table.Cell>
				  </Table.Row>
			  </Table.Body>
		  </Table>
	  </Segment>
    );
  }
}

export default withRouter(CommentRow);
