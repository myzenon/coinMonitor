import React, { Component } from 'react'
import { Control } from '../components'
import { remote } from 'electron'

export default class ControlContainer extends Component {
    handleClick() {
        remote.getCurrentWindow().close();
    }
    render() {
        return (
            <Control handleClick={this.handleClick} />
        )
    }
}