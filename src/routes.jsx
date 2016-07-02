import React, { Component } from 'react'
import { Route, IndexRoute, IndexRedirect } from 'react-router'
import App from './App'
import { Prices } from './containers'
import { ipcRenderer } from 'electron'

ipcRenderer.send('get-prices')
setInterval(() => {
  ipcRenderer.send('get-prices')
}, 1000)

class BTC extends Component {
  constructor(props) {
    super(props);
    this.state = {prices : []};
  }
  componentWillMount() {
    ipcRenderer.on('send-prices', (event, arg) => {
      this.setState({prices : arg.btc});
    });
  }
  render() {
    return (
      <Prices data={this.state.prices} />
    );
  }
}

class ETH extends Component {
  constructor(props) {
    super(props);
    this.state = {prices : []};
  }
  componentWillMount() {
    ipcRenderer.on('send-prices', (event, arg) => {
      this.setState({prices : arg.eth});
    });
  }
  render() {
    return (
      <Prices data={this.state.prices} />
    );
  }
}


export default (
  <Route path="/" component={App}>
    <IndexRedirect to="/btc" />
    <Route path="eth" component={ETH} />
    <Route path="btc" component={BTC} />
  </Route>
);
