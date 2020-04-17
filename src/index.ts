import { ApolloServer } from "apollo-server";
import { resolvers } from "./hn";
import * as fs from "fs";

const typeDefs = fs.readFileSync("./schema.graphql", "utf8").toString();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
