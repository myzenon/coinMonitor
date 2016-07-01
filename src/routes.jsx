import React, { Component } from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import { Prices } from './containers'
import { ipcRenderer } from 'electron'

setInterval(() => {
  ipcRenderer.send('get-prices')
}, 10000)

ipcRenderer.on('send-prices', (event, arg) => {
  console.log(arg);
  prices = arg;
});

let prices = {
  btc: [],
  eth: []
};

const BTC = () => {
  return (
    <Prices data={prices.btc} />
  );
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BTC} />
  </Route>
);
