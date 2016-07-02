import React, {Component} from 'react'
import { PriceCard } from '../../components/'

function delimitNumbers(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}

class PriceCardContainer extends Component {

    changeCurrencyForm(currency, data) {
        switch(currency) {
            case 'THB' : return "THB: " + data + " ฿";
            case 'USD' : return "USD: " + data + " $";
            case 'CNY' : return "CNY: " + data + " ¥";
            case 'BTC' : return "BTC: " + data;
        }
    }

    changePriceForm(price) {
        if(price < 1) {
            return parseFloat(price).toFixed(5);
        }
        else {
            return delimitNumbers(parseFloat(price).toFixed(2));
        }
    }

    render() {
        let price = this.props.data;
        price.buy = this.changeCurrencyForm('THB' ,this.changePriceForm(price.buy));
        price.sell = this.changeCurrencyForm('THB' ,this.changePriceForm(price.sell));
        if(price.buy_actual) {
            price.buy_actual = this.changeCurrencyForm(price.currency ,this.changePriceForm(price.buy_actual));
        }
        if(price.sell_actual) {
            price.sell_actual = this.changeCurrencyForm(price.currency ,this.changePriceForm(price.sell_actual));
        }
        return (
            <PriceCard price={price} />
        )
    }
}

export default PriceCardContainer