module.exports = {
  Query: {
    async finances(_, args, context) {
      return await context.yahoo.financials(args.symbol)
    },
    async insights(_, args, context) {
      return await context.yahoo.insights(args.symbol)
    },
    async recommendations(_, args, context) {
      return await context.yahoo.recommendations(args.symbol)
    }
  },
}

