import React, { PropTypes } from 'react'
import { Row, Col } from 'react-flexbox-grid'
import { Card, CardHeader, CardText }  from 'material-ui/Card'
import style from './PriceCard.scss'
import Divider from 'material-ui/Divider'
import { grey600 } from 'material-ui/styles/colors'

const PriceCard = ({ price }) => (
    <Card
        zDepth={3}
        style={{
            backgroundColor : grey600
        }} 
    >
        <CardHeader
            title={
                <img className={style.img_header} src={price.img} />
            }
        />
        <CardText
            style={{
                paddingTop : '5px'
            }}
        >
        <Row>
            <Col xs={8}>
                <span className={style.main_price_buy}>{price.buy}</span>
                <br />
                {
                    (() => {
                        let value;
                        if(price.buy_actual) {
                            value = price.buy_actual
                        }
                        else {
                            value = <span>&nbsp;</span>
                        }
                        return <span className={style.sub_price_buy}>{value}</span>
                    })()
                }
            </Col>
            <Col className={style.indicatior_price} xs={4}>BUY&nbsp;</Col>
        </Row>
        <Row>
            <Col xs={12}>
                <Divider
                    style={{
                        backgroundColor: '#909090',
                        marginTop : '10px',
                        marginBottom : '10px'
                    }}
                />
            </Col>
        </Row>
        <Row>
            <Col xs={8}>
                <span className={style.main_price_sell}>{price.sell}</span>
                <br />
                {
                    (() => {
                        let value;
                        if(price.sell_actual) {
                            value = price.sell_actual
                        }
                        else {
                            value = <span>&nbsp;</span>
                        }
                        return <span className={style.sub_price_sell}>{value}</span>
                    })()
                }
            </Col>
            <Col className={style.indicatior_price} xs={4}>SELL</Col>
        </Row>
        </CardText>
    </Card>
)

PriceCard.propTypes = {
    price: PropTypes.object.isRequired
}

export default PriceCard