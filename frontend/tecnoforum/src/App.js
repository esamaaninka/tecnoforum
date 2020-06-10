import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import ListAllUsers from './components/ListAllUsers'
import GetUser from './components/GetUser';
import Registration from './components/Registration';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div>
			<h1>_TecnoForum_</h1>{' '}
			<Switch>
				<Route exact path="/" render={() => (<ListAllUsers/>)}/>
				<Route exact path="/user/:name" render={(props) => (<GetUser name={props.match.params.name}/>)}/>
				<Route exact path="/register/" render={() => (<Registration history={this.props.history}/>)}/>
				<Route render={() => (<ListAllUsers/>)}/>
			</Switch>
			</div>
		);
	}
}

export default withRouter(App);