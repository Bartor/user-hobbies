import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.scss';
import Navigation from './components/Navigation/Navigation';
import UserList from './components/UserList/UserList';

const navLinks: {
  uri: string,
  title: string
}[] = [];

function App() {
  return (
    <Router>
      <Navigation navLinks={navLinks} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <React.Fragment>
              <UserList />
            </React.Fragment>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
