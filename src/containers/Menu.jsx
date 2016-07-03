import React, { Component } from 'react'
import { Menu } from '../components'
import { hashHistory } from 'react-router'

export default class MenuContainer extends Component {
    handleActive(tab) {
        hashHistory.push('/' + tab.props.label)
    }
    findActivePath = () => {
        return this.props.route.route.childRoutes.findIndex((route) => {
            return route.path === this.props.route.location.pathname.substring(1)
        })
    }
    render() {
        return (
           <Menu handleActive={this.handleActive} nowActive={this.findActivePath()} />
        );
    }
}