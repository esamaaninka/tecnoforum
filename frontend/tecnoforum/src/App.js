import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import ListAllUsers from './components/ListAllUsers';
import Registration from './components/Registration';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ListAllCategories from './components/ListAllCategories';
import ViewThread from './components/ViewThread';
import ViewCategory from './components/ViewCategory';
import NewThread from './components/NewThread';
import EditThread from './components/EditThread';

const App = ({ isLogged, history, match }) => {
  return (
    <div>
      <NavBar />
      <Container style={{ 'paddingTop': '100px' }}>
        <Switch>
          <Route exact path='/users/' render={() => <ListAllUsers />} />
          <Route exact path='/register/'render={() => (isLogged ? <Redirect to='/' /> : <Registration history={history} />)}/>
          <Route exact path='/login/' render={() => (isLogged ? <Redirect to='/' /> : <Login history={history} />)} />
		  <Route exact path='/c/:id' render={({match}) => <ViewCategory id={match.params.id} history={history} />} />
		  <Route exact path='/c/:id/page-:page' render={({match}) => <ViewCategory id={match.params.id} page={match.params.page} history={history} />} />
		  <Route exact path='/c/:id/new-thread' render={({match}) => <NewThread id={match.params.id} history={history} />} />
		  <Route exact path='/t/:id' render={({match}) => <ViewThread id={match.params.id} history={history} />} />
		  <Route exact path='/t/:id/page-:page' render={({match}) => <ViewThread id={match.params.id} page={match.params.page} history={history} />} />
		  <Route exact path='/t/:id/edit-thread' render={({match}) => <EditThread id={match.params.id} history={history} />} />
          <Route render={() => <ListAllCategories history={history} />} />
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
