import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './routes.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin'
import reset from 'reset-css/_reset.scss'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

render(<Router history={hashHistory} routes={routes} />, document.getElementById('app'))