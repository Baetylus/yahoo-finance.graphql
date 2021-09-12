import express from 'express';
import { config } from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema';
import resolvers from './src/graphql/resolvers/index.js';

const app = express();
config();

const PORT = process.env.PORT || 3000;



(async () => {
  const schema = await loadSchema('./src/graphql/types/*.graphql', { // load from multiple files using glob
    loaders: [
      new GraphQLFileLoader()
    ]
  });

  // Add resolvers to the schema
  const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

  app.use('/graphql', (req, res, next) => {
    const bearerHeader = req.header('Authorization');
    // if (bearerHeader) {
    //   // const [_, access_token] = bearerHeader.split(' ');
    // } {
    //   // return res.sendStatus(403);
    // }
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
