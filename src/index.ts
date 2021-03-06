import dotenv from "dotenv";
dotenv.config();

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOption from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscriptions"
const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const token = connectionParams['X-JWT']
      if(token){
        const user = await decodeJWT(token)  
        return { 
          currentUser: user
        }
      } 
      throw new Error("No JWT. Can't Subscribe")
    }
  }
};

const handleAppStart = () => console.log(`running on port ${PORT}`);

createConnection(connectionOption).then(() =>
  app.start(appOptions, handleAppStart)
).catch(error => console.log(error));
