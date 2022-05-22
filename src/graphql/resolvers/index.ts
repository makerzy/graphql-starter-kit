import { Mutation } from "./mutations";
import { Queries } from "./queries";

export const resolvers = { ...Mutation, ...Queries };
