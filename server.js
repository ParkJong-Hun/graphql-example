import { ApolloServer, gql } from "apollo-server";

const tweets = [
    {
        id: "1",
        text: "fisrt one",
    },
    {
        id: "2",
        text: "second one",
    },
];

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String
    }

    type Tweet {
        id: ID!
        text: String!
        author: User
    }

    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
        ping: String!
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTwwet(id: ID!): Boolean!
    }
`;

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        tweet(root, {id}) {
            return tweets.find(tweet => tweet.id === id);
        },
        ping() {
            return "pong";
        },
    },
};

const server = new ApolloServer({typeDefs});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});
