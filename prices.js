const { ipcMain } = require('electron');
const https = require('https');
const apiPath = require('./config/apiPath.json');
const currencyPath = require('./config/currency.json');

const errorHandle = (error, url = null) => {
    console.log('Error is : ');
    console.error(error);
    if(url) {
        console.error('At URL : ' + url)
    }
};

const getFromKeyPath = (dataObj, pathArray) => {
    let data = dataObj;
    for(let path of pathArray) {
        data = data[path];
    }
    return data;
};

const promiseGetURL = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (respone) => {
            let data = '';
            respone.on('data', (chunk) => {
                data += chunk;
            });
            respone.on('end', () => {
                resolve({
                    url: url,
                    data : JSON.parse(data)
                });
            });
        })
        .on('error', (error) => {
            reject(error);
            errorHandle(error, url);
        });
    })
    // To Prevent Error Go Through Promise.All()
    .catch((error) => {});
};

const objURLtoGetPromiseArray = (obj, urlPath, checkCondition = () => true) => {
    let set = new Set();
    for (let key in obj) {
        if(Array.isArray(obj[key])) {
            obj[key].forEach((subObj) => {
                if(checkCondition(subObj)) {
                    set.add(getFromKeyPath(subObj, urlPath));
                }
            });
        }
        else {
            if(checkCondition(obj[key])) {
                set.add(getFromKeyPath(obj[key], urlPath));
            }
        }
    }
    return Array.from(set).map((url) => {
        return promiseGetURL(url);
    });
};

const mapAPIToData = (apiData) => {
    let coinsData = {};
    for(let coin in apiPath) {
        coinsData[coin] = [];
        apiPath[coin].forEach((api) => {
            const find = apiData.find((data) => {
                if(data !== undefined) {
                    return data.url === api.url;
                }
                return null;
            });
            if(find) {
                coinsData[coin].push({
                    "name": api.name,
                    "currency": api.currency,
                    "buy": getFromKeyPath(find.data, api.buy),
                    "sell": getFromKeyPath(find.data, api.sell),
                    "img": api.img
                });
            }
        });
    }
    return coinsData;
};


const getCurrenciesData = () => {
    return new Promise((resolve, reject) => {
        Promise.all(objURLtoGetPromiseArray(currencyPath, ["url"], (currency) => {
            return currency.manualRate === "";
        }))
        .then((currenciesAPIData) => {
            let currenciesData = {};
            for(let currency in currencyPath) {
                currenciesData[currency] = currencyPath[currency].manualRate;
            }
            currenciesAPIData.forEach((currencyData) => {
                for(currency in currencyPath) {
                    if(currencyPath[currency].url === currencyData.url) {
                        currenciesData[currency] = getFromKeyPath(currencyData.data, currencyPath[currency].rate);
                    }
                }
            });
            resolve(currenciesData);
        })
        ;
    });
}

const changeCurrency = (coinsData) => {
    return getCurrenciesData().then((currenciesData) => {
        // Static BTC Currency [BX.IN.TH]
        currenciesData["BTC"] = coinsData.btc[1].sell;
        for(coin in coinsData) {
            coinsData[coin].forEach((coinData) => {
                if(currenciesData[coinData.currency]) {
                    coinData["buy_actual"] = coinData.buy;
                    coinData["sell_actual"] = coinData.sell;
                    coinData.buy = coinData.buy * currenciesData[coinData.currency];
                    coinData.sell = coinData.sell * currenciesData[coinData.currency];
                }
            });
        }
        return coinsData;
    });
};

ipcMain.on('get-prices', (event, arg) => {
    Promise.all(objURLtoGetPromiseArray(apiPath, ["url"]))
        .then(mapAPIToData)
        .then(changeCurrency)
        .then((coinsData) => {
            console.log('GET Prices Complete');
            event.sender.send('send-prices', coinsData);
        })
    ;
});


