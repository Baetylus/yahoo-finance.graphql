
const app = require('express')();
const dotenv = require('dotenv');


const { graphqlHTTP } = require('express-graphql');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { loadSchema } = require('@graphql-tools/load');
const { addResolversToSchema } = require('@graphql-tools/schema');

const resolvers = require('./src/graphql/resolvers');
const YahooFinance = require('./src/yahoo-finance');



dotenv.config();

const PORT = process.env.PORT || 3000;
const host = process.env.YAHOO_FINANCE_HOST, secret = process.env.YAHOO_FINANCE_CLIENT_SECRET;

(async () => {
  const schema = await loadSchema('./src/graphql/types/*.graphql', { // load from multiple files using glob
    loaders: [
      new GraphQLFileLoader()
    ]
  });

  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

  app.use('/graphql', (req, _, next) => {
    req.yahoo = new YahooFinance(host, secret);
    next();
  });

  app.use('/graphql', graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true
  }));


  app.listen(PORT, () => {
    console.info(`Listening on ${PORT}`);
  });
})()
