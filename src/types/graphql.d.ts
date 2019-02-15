export const typeDefs = ["type Greeting {\n  text: String!\n  error: Boolean!\n}\n\ntype Query {\n  sayBye(name: String!): Greeting!\n  sayHello: String!\n}\n"];
/* tslint:disable */

export interface Query {
  sayBye: Greeting;
  sayHello: string;
}

export interface SayByeQueryArgs {
  name: string;
}

export interface Greeting {
  text: string;
  error: boolean;
}
