import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { hnType } from "./hn";

const schema = new GraphQLSchema({
  query: hnType,
});

const server = new ApolloServer({ schema });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
