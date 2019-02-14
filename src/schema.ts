import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import path from "path";

// api 폴더 내에 있는 모든 타입들과 resolver 들을 합쳐서 하나의 스키마를 만든다.

const allTypes: string[] = fileLoader(
  path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers = fileLoader(
  path.join(__dirname, "./api/**/*.resolvers.*")
);

const mergedTypes = mergeTypes(allTypes);
const mergedResolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: mergedResolvers
});

export default schema;
