// const fetch = require('node-fetch')
import fetch from 'node-fetch'
export default class YahooFinance {

  constructor(host, key, region) {
    this.host = host;
    this.key = key;
    this.region = region;
  }

  financials(symbol) {
    const params = new URLSearchParams();
    params.set('symbol', symbol);
    params.set('region', 'US');

    return this.get('/stock/v2/get-financials', params);
  }

  async get(endpoint, params) {
    console.log(params)
    console.log('running')
    const response = await fetch(`https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-financials?${params.toString()}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': this.host,
        'x-rapidapi-key': this.key
      }
    });

    const json = await response.json()
    console.log(json);
    return json;
  }
}