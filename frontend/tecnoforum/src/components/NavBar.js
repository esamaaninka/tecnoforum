import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Image, Container } from 'semantic-ui-react';
import { onLogout } from '../actions/loginActions';

class NavBar extends React.Component {
  nav(to) {
    this.props.history.push(to);
  }

  loginBar = () => {
	return (
		<>
		<Menu.Item onClick={() => this.nav('/register')}>Register</Menu.Item>
        <Menu.Item onClick={() => this.nav('/login')}>Login</Menu.Item>
		</>
	);
  }

  loggedInBar = () => {
	return (
		<>
		<Menu.Item>Welcome ...</Menu.Item>
		<Menu.Item onClick={() => this.nav('/')}>Account</Menu.Item>
		<Menu.Item onClick={() => this.props.dispatch(onLogout(this.props.token))}>Logout</Menu.Item>
		</>
	);
  }

  render() {
    return (
      <Menu fixed='top'>
        <Container>
          <Menu.Item onClick={() => this.nav('/')} header>
            <Image src='TF_logo.gif' size='large' />
          </Menu.Item>
          <Menu.Menu position='right'>
            {this.props.isLogged ? this.loggedInBar() : this.loginBar()}
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
	loading: state.login.loading,
	isLogged: state.login.isLogged,
	token: state.login.token
  };
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

// export default withRouter(NavBar);
