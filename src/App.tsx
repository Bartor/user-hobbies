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
import HobbyList from './components/HobbyList/HobbyList';

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
              <main>
                <UserList />
                <HobbyList />
              </main>
            </React.Fragment>
          )}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
