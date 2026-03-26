import {ApolloServer,gql} from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';

const typeDefs = gql`
    type Query {
        greet:String
    }
`
const resolvers={
    Query:{
        greet:()=>"Hello World"
    }
}

//create instance of apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})
// ctrl + space to get the options for plugins

//start the server
server.listen().then(({url})=>{
    console.log(`Server is running at ${url}`);
})