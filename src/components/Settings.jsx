import React, {PropTypes} from 'react'
import { grey300 } from 'material-ui/styles/colors'
import { TextField, Paper, RaisedButton, Snackbar } from 'material-ui'
import MonetizationOnIcon from 'material-ui/svg-icons/editor/monetization-on'
import { Row, Col } from 'react-flexbox-grid'
import style from './Settings.scss'

const Settings = ({ currencies, handleChange, handleClick, snackBar, handleSnackBar }) => {
    let textFields = [];
    for(let currency in currencies) {
        textFields.push(<Col key={currency} xs={6}>
                            <TextField
                                name={currency}
                                onChange={handleChange}
                                floatingLabelText={currency}
                                value={currencies[currency].manualRate}
                            />
                        </Col>
        )
    }
    return (
        <div>
            <Paper>
                <Paper
                    rounded={false}
                    style={{
                        padding: "20px",
                        backgroundColor: grey300,
                        fontSize: "1.4em"
                    }}
                >
                    <MonetizationOnIcon style={{
                        verticalAlign: "bottom"
                    }}
                    />
                    &nbsp;Currencies
                </Paper>
                <div className={style.content_box}>
                     <Row>
                        {textFields}
                    </Row>
                    <Row><Col xs={12}>&nbsp;</Col></Row>
                    <Row>
                        <Col xs={3} xsOffset={9}>
                            <RaisedButton onClick={handleClick} label="Change" primary={true} />
                        </Col>
                    </Row>
                </div>
            </Paper>
            <Snackbar
                open={snackBar}
                message="Save Complete !"
                autoHideDuration={2000}
                onRequestClose={handleSnackBar}
            />
        </div>
    );
};

Settings.propTypes = {
    currencies: PropTypes.object.isRequired,
    handleChange : PropTypes.func.isRequired,
    handleClick : PropTypes.func.isRequired,
    snackBar: PropTypes.bool.isRequired,
    handleSnackBar: PropTypes.func.isRequired
};

export default Settings