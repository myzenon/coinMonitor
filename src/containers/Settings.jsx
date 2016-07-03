import React, {Component} from 'react';
import { ipcRenderer } from 'electron'
import { Settings } from './../components/'

class SettingsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {currencies : {}, snackBar: false}
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleSnackBar = this.handleSnackBar.bind(this)
    }
    componentWillMount() {
        this.state.currencies = ipcRenderer.sendSync('get-currencies')
    }
    handleChange(event) {
        if((parseFloat(event.target.value) == event.target.value) || (event.target.value === '')) {
            this.state.currencies[event.target.name].manualRate = event.target.value
            this.setState(this.state);
        }
    }
    handleClick() {
        ipcRenderer.sendSync('change-currencies', this.state.currencies)
        this.setState({snackBar : true})
    }
    handleSnackBar() {
        this.setState({snackBar : false})
    }
    render() {
        return (
            <Settings currencies={this.state.currencies} handleChange={this.handleChange} handleClick={this.handleClick} snackBar={this.state.snackBar} handleSnackBar={this.handleSnackBar} />
        )
    }
}

export default SettingsContainer