import React, { Component } from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './App'
import { Prices, Settings } from './containers'

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/btc" />
    <Route path="eth" component={Prices} />
    <Route path="btc" component={Prices} />
    <Route path="settings" component={Settings} />
  </Route>
);
