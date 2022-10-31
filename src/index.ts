import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Db, MongoClient } from "mongodb";
import { Context, ReqResNext } from "../types";
import { typeDefs } from "./graphql/model";
import { resolvers } from "./graphql/resolvers";

dotenv.config();
const { DB_NAME, DB_URI, JWT_SECRET } = process.env;

const main = async () => {
  try {
    const client = new MongoClient(DB_URI);
    await client.connect();
    const db: Db = client.db(DB_NAME);

    const context = async ({ req, res, next }: ReqResNext) =>
      ({ db, req, res, next } as Context);

    const server = new ApolloServer({ typeDefs, resolvers, context });

    await server.start();

    const app = express();
    app.use(cookieParser());

    const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

    let corsOptions;
    app.use((req, res, next) => {
      const origin = req.headers.origin;
      if (allowedOrigins?.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
        corsOptions = {
          origin: origin,
          "access-control-allow-origin": origin,
          "access-control-allow-credentials": true,
        };
      }

      return next();
    });

    // const host =
    //   window?.location?.host !== undefined
    //     ? window?.location?.host
    //     : "http://localhost";
    app.use(cors(corsOptions));
    server.applyMiddleware({ app, path: "/graphql" });
    const port = process.env.PORT || "8080";
    const _server = app.listen({ port }, () =>
      console.log(`Now browse to http://localhost:${port}${server.graphqlPath}`)
    );
    process.on("unhandledRejection", (err: any, promise) => {
      console.log(`Error: ${err.message}`);
      _server.close(() => process.exit(1));
    });
  } catch (err) {
    console.error(err);
  }
};

main().then(()=> console.log("Success!!")).catch(()=>{
  console.log("Unhandled Exception(s)!!!")
})
