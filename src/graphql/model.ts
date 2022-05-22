import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    getProducts: [Product!]!
  }

  type Mutation {
    addProduct(input: addProductInput): Boolean!
  }

  type Product {
    name: String!
    price: Int!
    description: String!
  }

  input addProductInput {
    name: String!
    price: Int!
    description: String!
  }
`;
