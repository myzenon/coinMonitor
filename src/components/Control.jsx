import React, { PropTypes } from 'react'
import { FlatButton, FontIcon } from 'material-ui'
import { redA200, fullWhite } from 'material-ui/styles/colors'
import CloseIcon from 'material-ui/svg-icons/content/clear'

const Control = ({ handleClick }) => (
    <FlatButton
        onClick={handleClick}
        hoverColor={redA200}
        icon={<CloseIcon hoverColor={fullWhite} />}
    />
)

Control.propTypes = {
    handleClick : PropTypes.func.isRequired
}

export default Control