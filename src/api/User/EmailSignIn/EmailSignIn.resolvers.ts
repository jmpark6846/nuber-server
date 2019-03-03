import { Resolvers } from "../../../types/resolvers";
import {
  EmailSignInMutationArgs,
  EmailSignInResponse
} from "../../../types/graphql";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    EmailSignIn: async (
      _,
      args: EmailSignInMutationArgs
    ): Promise<EmailSignInResponse> => {
      const { email, password } = args;
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "해당 이메일의 사용자가 존재하지 않습니다.",
            token: null
          };
        }

        const checkPassword: boolean = await user.comparePassword(password);
        if (checkPassword) {
          return {
            ok: true,
            error: null,
            token: "Coming soon, sign in"
          };
        } else {
          return {
            ok: false,
            error: "잘못된 비밀번호 입니다.",
            token: null
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

export default resolvers