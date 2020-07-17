import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Segment, Message } from 'semantic-ui-react';

import Spinner from './Spinner';
import { onRegister } from '../actions/registerActions';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      password: '',
      email: '',
      nickname: '',
    };
  }

  onChange = (event) => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  onSubmit = (event) => {
	event.preventDefault();
	
	if (this.state.fullname.length === 0) {
      alert('Fullname required');
      return;
    } else if (this.state.email.length === 0) {
      alert('Email required');
      return;
	}
	
	let user = {
      fullname: this.state.fullname,
      password: this.state.password,
      email: this.state.email,
      nickname: this.state.nickname
	}

	this.props.dispatch(onRegister(user));
  };

  render() {
	const isLoading = this.props.loading && <Spinner />;
	const success = this.props.success && <Message success header='Registration was successful' content='You may now login.' />; 
	const fail = this.props.error.length > 0 && <Message error header='Registration was unsuccessful' content={this.props.error} />; 
    return (
	  <div>
		{isLoading}
		{success || fail}
		<Segment>
			<Form>
			<Form.Field>
				<label htmlFor='fullname'>Fullname</label>
				<input type='text' name='fullname' placeholder='Fullname' value={this.state.fullname} onChange={this.onChange} />
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
			<Form>
			<Form.Field>
				<label htmlFor='email'>Email</label>
				<input type='text' name='email' placeholder='Email' value={this.state.email} onChange={this.onChange} />
			</Form.Field>
			</Form>
			<br/>
			<Form>
			<Form.Field>
				<label htmlFor='nickname'>Nickname</label>
				<input type='text' name='nickname' placeholder='Nickname' value={this.state.nickname} onChange={this.onChange} />
			</Form.Field>
			</Form>
			<br/>
			<Button position='right' onClick={this.onSubmit}>Register</Button>
		</Segment>
	  </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
	  loading: state.register.loading,
	  success: state.register.success,
	  error: state.register.error
	};
};

const mapDispatchToProps = (dispatch) => ({
	dispatch
});
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));