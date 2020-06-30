import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import ListAllUsers from './components/ListAllUsers';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Segment, Container } from 'semantic-ui-react';
import ListAllCategories from './components/ListAllCategories';

const App = ({ history }) => {
  return (
    <div>
      <NavBar />
      <Container style={{ 'padding-top': '100px' }}>
        <Switch>
          <Route exact path='/users/' render={() => <ListAllUsers />} />
          <Route exact path='/register/' render={() => <Registration history={history} />} />
          <Route exact path='/login/' render={() => <Login history={history} />} />
          <Route render={() => <ListAllCategories />} />
        </Switch>
      </Container>
    </div>
  );
};

// {/* <Route exact path='/user/:name' render={(props) => <GetUser name={props.match.params.name} />} /> */}

export default withRouter(App);
