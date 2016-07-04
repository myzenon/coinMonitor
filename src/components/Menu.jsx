import React, { PropTypes } from 'react';
import { AppBar, IconButton } from 'material-ui'
import style from './Menu.scss'
import { teal700, lightBlueA700, cyan900, lightBlue900 } from 'material-ui/styles/colors'
import DashBoardIcon from 'material-ui/svg-icons/action/dashboard'
import CompareIcon from 'material-ui/svg-icons/action/compare-arrows'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import {Tabs, Tab} from 'material-ui/Tabs';

const barStyle = {
    backgroundColor: lightBlue900
}

const titleStyle = {
    height: 'auto'
}

const inkBarStyle = {
    height: '5px',
    backgroundColor: lightBlueA700
}

const Menu = ({ handleActive, nowActive }) => {
    return (
       <AppBar
            style={barStyle}
            titleStyle={titleStyle}
            className={style.bar}
            iconElementLeft={<div></div>}
            iconElementRight={<div></div>}
            title={
                <Tabs
                    tabItemContainerStyle={barStyle}
                    inkBarStyle={inkBarStyle}
                    initialSelectedIndex={nowActive}
                >
                    <Tab
                        icon={<DashBoardIcon />}
                        label="eth"
                        onActive={handleActive}
                    />
                    <Tab 
                        icon={<DashBoardIcon />}
                        label="btc"
                        onActive={handleActive}
                    />
                    <Tab
                        icon={<SettingsIcon />}
                        label="settings"
                        onActive={handleActive}
                    />
                </Tabs>
            }
        />
    );
}

Menu.propTypes = {
    handleActive: PropTypes.func.isRequired,
    nowActive: PropTypes.number
}

export default Menu

/***********************
 * 
 * 
 *                   <Tab
                        icon={<CompareIcon />}
                        label="compare"
                        onActive={handleActive}
                    />
 * 
 * 
 ************************/