import React, { Component } from 'react'
import { Menu } from '../components'
import { hashHistory } from 'react-router'

export default class MenuContainer extends Component {
    handleActive(tab) {
        hashHistory.push('/' + tab.props.label)
    }
    render() {
        return (
           <Menu handleActive={this.handleActive} />
        );
    }
}