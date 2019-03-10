import { Resolvers } from "src/types/resolvers";
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse
} from "src/types/graphql";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;
      try {
        // 만약 이미 fbId 로 가입한 유저라면 로그인 한다.
        const existingUser = await User.findOne({ fbId });
        if (existingUser) {
          const token = createJWT(existingUser.id)
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }

      // 만약 없는 fbId 일 경우 유저를 생성한다.
      try {
        const newUser = await User.create({
          ...args,
          profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
        }).save();
        const token = createJWT(newUser.id)
        return {
          ok: true,
          error: null,
          token
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;
