const fetch = require('node-fetch')
module.exports = class YahooFinance {

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
  insights(symbol) {
    const params = new URLSearchParams();
    params.set('symbol', symbol);
    return this.get('/stock/v2/get-insights', params);
  }

  async get(endpoint, params) {
    const response = await fetch(`https://${this.host}${endpoint}?${params.toString()}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': this.host,
        'x-rapidapi-key': this.key
      }
    });
    return await response.json();
  }
}