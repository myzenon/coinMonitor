import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import style from './App.scss'
import { Grid } from 'react-flexbox-grid'
import { Menu, Control } from './containers'

class App extends Component {
    render () {
        return (
            <MuiThemeProvider>
                <div>
                    <div className={style.content}>

                        <Grid className={style.grid}>{this.props.children}</Grid>
                    </div>
                    <nav className={style.menu}>
                        <Menu route={this.props} />
                    </nav>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;