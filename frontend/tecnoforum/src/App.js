import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import ListAllUsers from './components/ListAllUsers';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Segment, Container } from 'semantic-ui-react';

const App = ({ history }) => {
  return (
    <div>
	  <NavBar/>
	  <Container style={{"padding-top":"80px"}}>
		<h1>_TecnoForum_</h1>{' '}
		<Switch>
			<Route exact path='/' render={() => <ListAllUsers />} />
			{/* <Route exact path='/user/:name' render={(props) => <GetUser name={props.match.params.name} />} /> */}
			<Route exact path='/register/' render={() => <Registration history={history} />} />
			<Route exact path='/login/' render={() => <Login history={history} />} />
			<Route render={() => <ListAllUsers />} />
		</Switch>
	  </Container>
    </div>
  );
};

export default withRouter(App);
