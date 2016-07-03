const { ipcMain } = require('electron');
const https = require('https');
const fs = require('fs');
const apiPath = JSON.parse(fs.readFileSync(__dirname + '/config/apiPath.json', 'utf8'));
const apiImg = JSON.parse(fs.readFileSync(__dirname + '/config/apiImg.json', 'utf8'));
let currencyPath = JSON.parse(fs.readFileSync(__dirname + '/config/currency.json', 'utf8'));

module.exports = (mainEvent) => {
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

    const addFilters = (coinsData) => {
        for(let coin in coinsData) {
            for(let index in coinsData[coin]) {
                const originBuy = coinsData[coin][index].buy;
                const originSell = coinsData[coin][index].sell;
                apiPath[coin][index].filters.forEach((filter) => {
                    switch(filter.type) {
                        case "static" :
                            coinsData[coin][index].buy += parseFloat(filter.value);
                            coinsData[coin][index].sell += parseFloat(filter.value);
                        case "percent" : 
                            let buyToCal = 0, sellToCal = 0;
                            if(filter.from === "continue") {
                                buyToCal = coinsData[coin][index].buy;
                                sellToCal = coinsData[coin][index].sell;
                            }
                            else if(filter.from === "original") {
                                buyToCal = originBuy;
                                sellToCal = originSell;
                            }
                            coinsData[coin][index].buy += (filter.value / 100.0) * buyToCal;
                            coinsData[coin][index].sell += (filter.value / 100.0) * sellToCal;
                    }
                });
            }
        }
        return coinsData;
    }

    const matchImg = (coinsData) => {
        for(coin in coinsData) {
            coinsData[coin].forEach((coinData) => {
                coinData.img = apiImg[coinData.name];
            });
        }
        return coinsData;
    }

    let data = {
        btc: [],
        eth: []
    }

    const getAllPrices = () => {
        return Promise.all(objURLtoGetPromiseArray(apiPath, ["url"]))
            .then(mapAPIToData)
            .then(changeCurrency)
            .then(addFilters)
            .then(matchImg)
            .then((coinsData) => {
                data = coinsData;
                return coinsData;
            })
        ;
    }

    getAllPrices().then(() => {
        mainEvent.emit('open-program');
    });
    setInterval(getAllPrices, 120000);

    ipcMain.on('get-prices', (event, arg) => {
        event.sender.send('send-prices', data);
    });


    ipcMain.on('change-currencies', (event, arg) => {
        currencyPath = arg;
        fs.writeFileSync(__dirname + '/config/currency.json', JSON.stringify(currencyPath ,null, 4));
        event.sender.send('send-prices', getAllPrices());
        event.returnValue = 'complete';
    });
}

