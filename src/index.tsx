import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './logic/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import server from './logic/api/server';
import { requestLoadUserList } from './logic/state/users';

server();
store.dispatch(requestLoadUserList());
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();