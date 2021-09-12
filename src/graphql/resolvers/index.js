import YahooFinance from "../../yahoo-finance.js"


export default {
  Query: {
    async finances() {
      return await new YahooFinance(host, secret).financials('AAPL')
    }
  },
  // Mutation: {

  // }
}

