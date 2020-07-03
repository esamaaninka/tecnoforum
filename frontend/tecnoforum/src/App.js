import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import ListAllUsers from './components/ListAllUsers';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import { Container } from 'semantic-ui-react';
import ListAllCategories from './components/ListAllCategories';
import ViewThread from './components/ViewThread';

const App = ({ isLogged, history }) => {
  return (
    <div>
      <NavBar />
      <Container style={{ 'padding-top': '100px' }}>
        <Switch>
          <Route exact path='/thread/' render={() => <ViewThread />} />
          <Route exact path='/users/' render={() => <ListAllUsers />} />
          <Route
            exact
            path='/register/'
            render={() => (isLogged ? <Redirect to='/' /> : <Registration history={history} />)}
          />
          <Route exact path='/login/' render={() => (isLogged ? <Redirect to='/' /> : <Login history={history} />)} />
          <Route render={() => <ListAllCategories />} />
        </Switch>
      </Container>
    </div>
  );
};

// {/* <Route exact path='/user/:name' render={(props) => <GetUser name={match.params.name} />} /> */}

const mapStateToProps = (state) => {
  return {
    loading: state.login.loading,
    isLogged: state.login.isLogged,
    token: state.login.token,
  };
};

export default withRouter(connect(mapStateToProps)(App));
