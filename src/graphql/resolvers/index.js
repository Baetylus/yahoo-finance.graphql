module.exports = {
  Query: {
    async finances(_, args, context) {
      return await context.yahoo.financials(args.symbol)
    }
  },
}

