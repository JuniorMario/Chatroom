import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/chat" exact={true} component={App} />
    </Switch>
  </ BrowserRouter>
  , document.getElementById('root')
);

serviceWorker.unregister();
