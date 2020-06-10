import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import Spinner from './Spinner';
import SendDataController from '../controller/SendDataController';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  fullname:"",
	  password:"",
	  email:"",
	  nickname:""
    };
  }

  onChange = (event) => {
    let state = {}
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  onSubmit = (event) => {
	event.preventDefault();
	if(this.state.fullname.length === 0) {
		alert("Fullname required");
		return
	}
	else if (this.state.email.length ===0){
		alert("Email required");
		return
	}
	let newUser = {
		fullname:this.state.fullname,
		password:this.state.password,
		email:this.state.email,
		nickname:this.state.nickname,
	}
	SendDataController.register(this, newUser);
	this.props.history.push("/");
	this.setState({
		fullname:"",
		password:"",
		email:"",
		nickname:""
	})
}

  render() {
    return (
		<div>
			<Form>
				<Form.Field>
					<label htmlFor="fullname">Fullname</label>
					<input type="text" name="fullname" value={this.state.fullname} onChange={this.onChange}/>
				</Form.Field>
			</Form>
			<Form>
				<Form.Field>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={this.state.password} onChange={this.onChange}/>
				</Form.Field>
			</Form>
			<Form>
				<Form.Field>
					<label htmlFor="email">Email</label>
					<input type="text" name="email" value={this.state.email} onChange={this.onChange}/>
				</Form.Field>
			</Form>
			<Form>
				<Form.Field>
					<label htmlFor="nickname">Nickname</label>
					<input type="text" name="nickname" value={this.state.nickname} onChange={this.onChange}/>
				</Form.Field>
			</Form>
			<Button onClick={this.onSubmit}>Submit</Button>
		</div>
    );
  }
}