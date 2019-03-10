import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignUp: async (
      _,
      args: EmailSignUpMutationArgs
    ): Promise<EmailSignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            ok: false,
            error: "이미 존재하는 계정입니다. 로그인해주세요.",
            token: null
          };
        } else {
          const newUser = await User.create({ ...args }).save();
          const token = createJWT(newUser.id)
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
    }
  }
};

export default resolvers;
