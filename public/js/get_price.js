const { response } = require('express');
const fetch = require('node-fetch');

const getBars = async ({symbol, start, end}) => {
    try {
        const resp = await fetch(`https://data.alpaca.markets/v1/bars/minute?symbols=${symbol}&start=${start}&end=${end}&timeframe=1Min`, {
            headers: {
                'APCA-API-KEY-ID': process.env.APIKEY,
                'APCA-API-SECRET-KEY': process.env.SECRET
            }
        });
        return resp.json();
    } catch (e) {
        console.log(e);
    }
}

const getQoute = async (ticker) => {
        const response = await fetch(`https://data.alpaca.markets/v2/stocks/${ticker}/quotes/latest`, {
        method: 'GET',
        headers: {
                'APCA-API-KEY-ID': process.env.APIKEY,
                'APCA-API-SECRET-KEY': process.env.SECRET
            }
        });
        return response.json()
}

module.exports = getQoute
//module.exports = getBars


