import React, { Component } from 'react'
import { Menu } from '../components'

export default class MenuContainer extends Component {
    handleActive(tab) {
        console.log(tab.props.label);
    }
    render() {
        return (
           <Menu handleActive={this.handleActive} />
        );
    }
}