import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Image, Container } from 'semantic-ui-react';

class NavBar extends React.Component {
  nav(to) {
    this.props.history.push(to);
  }

  render() {
    return (
      <Menu fixed='top'>
        <Container>
          <Menu.Item onClick={() => this.nav('/')} header>
            <Image src='TF_logo.gif' size='large' />
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item onClick={() => this.nav('/register')}>Register</Menu.Item>
            <Menu.Item onClick={() => this.nav('/login')}>Login</Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

export default withRouter(NavBar);
