import {ApolloServer,gql} from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {users, posts} from './fakedb.js'

const typeDefs = gql`
    type Query {
        users: [User!]!
        posts: [Post!]!
        user(id: ID!):User
        post(id: ID!): [Post!]!
    }
    type User {     
        id: ID!
        name: String!
        email: String!
        password: String!
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        description: String!
        url: String!
        userId: ID!
    }
`
const resolvers={
    Query:{
        users:()=>users,
        posts:()=>posts,
        // user:(_,args)=>{users.find(user=>user.id==args.id)}, here _, is parent and as parent here is undefined we simply put _
        user:(_,{id})=>users.find(user=>user.id==id),  //destructuring the args to get id directly
        post:(_,{id})=>posts.filter(post=>post.userId==id), //here we need filter instead of find because we have one to many mapping between user and posts, so we need to return an array of posts for a user
    },
    User:{
        posts:(parent)=>posts.filter(post=>post.userId==parent.id)
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