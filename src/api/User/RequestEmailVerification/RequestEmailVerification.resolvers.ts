import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/authMiddleware";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";
import { RequestEmailVerificationResponse } from "../../../types/graphql";

const resolvers: Resolvers = {
  Mutation: {
    RequestEmailVerification: privateResolver(async (_, __, { req }): Promise<RequestEmailVerificationResponse> => {
      const user: User = req.user;
      if (user.email && !user.verifiedEmail) {
        try {
          const oldVerification = await Verification.findOne({
            payload: user.email
          });

          if (oldVerification) {
            oldVerification.remove();
          }

          const newVerification = await Verification.create({
            payload: user.email,
            target: "EMAIL"
          }).save();

          await sendVerificationEmail(user.fullName, newVerification.key);
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      } else {
        return {
          ok: false,
          error: "유저의 이메일이 없습니다."
        };
      }
    })
  }
};

export default resolvers;