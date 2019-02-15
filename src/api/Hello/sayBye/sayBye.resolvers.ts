import { Greeting, SayByeQueryArgs } from "src/types/graphql";

const resolvers = {
    Query: {
      sayBye: (_, args: SayByeQueryArgs): Greeting =>({
        text: `bye ${args.name}`,
        error: false
      })
    }
  };
  
  export default resolvers;