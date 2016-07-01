import React, { Component } from 'react'
import { MuiThemeProvider } from 'material-ui/styles'
import style from './app.scss'
import { Grid } from 'react-flexbox-grid'
import { Menu, Control } from './containers'

class App extends Component {
    render () {
        return (
            <MuiThemeProvider>
                <div>
                    <div className={style.content}>
                        <div className={style.bar}>&nbsp;</div>
                        <nav className={style.control}><Control /></nav>
                        <Grid className={style.grid}>{this.props.children}</Grid>
                    </div>
                    <nav className={style.menu}>
                        <Menu />
                    </nav>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default App;