import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Segment, Message } from 'semantic-ui-react';

import Spinner from './Spinner';
import { onLogin } from '../actions/loginActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = (event) => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = (event) => {
	event.preventDefault();
	
	let user = {
	  email: this.state.email,
      password: this.state.password
	}

	this.props.dispatch(onLogin(user, this.props.history));
  };

  render() {
	const isLoading = this.props.loading && <Spinner />;
	const fail = this.props.error.length > 0 && <Message error header='Login was unsuccessful' content={this.props.error} />; 
    return (
	  <div>
		{isLoading}
		{fail}
		<Segment>
			<Form>
			<Form.Field>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} />
			</Form.Field>
			</Form>
			<br/>
			<Form>
			<Form.Field>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.onChange} />
			</Form.Field>
			</Form>
			<br/>
			<Button position='right' onClick={this.onSubmit}>Log In</Button>
		</Segment>
	  </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
	  loading: state.login.loading,
	  error: state.login.error
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));