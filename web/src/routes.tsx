import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './pages/_layouts/default';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Layout>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/new" component={New} />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
