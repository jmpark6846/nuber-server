import {
  EmailSignUpMutationArgs,
  EmailSignUpResponse
} from "../../../types/graphql";
import { Resolvers } from "../../../types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

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
          const phoneVerification = await Verification.findOne({
            payload: args.phoneNumber,
            verified: true,
          })
          if(!phoneVerification){
            return {
              ok: false,
              error: "전화번호가 인증되지 않았습니다.",
              token: null
            }
          }

          const newUser = await User.create({ ...args }).save();
          if(!newUser.email){
            throw new Error("새로운 유저의 이메일이 저장되지 않았습니다.")
          }
          const emailVerification = await Verification.create({
            payload: newUser.email,
            target: "EMAIL",
          }).save()
          await sendVerificationEmail(newUser.fullName, emailVerification.key)
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
