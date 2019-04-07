import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/authMiddleware";
import User from "../../../entities/User";
import {
  CompleteEmailVerificationMutationArgs,
  CompleteEmailVerificationResponse
} from "../../../types/graphql";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
  Mutation: {
    CompleteEmailVerification: privateResolver(
      async (
        _,
        args: CompleteEmailVerificationMutationArgs,
        { req }
      ): Promise<CompleteEmailVerificationResponse> => {
        const user: User = req.user;
        const { key } = args;
        if (user.email) {
          try {
            const verification = await Verification.findOne({
              key,
              payload: user.email
            });

            if(verification){ 
              user.verifiedEmail = true;
              user.save();
              verification.verified=true;
              verification.save()
              
              return { 
                ok: true,
                error: null
              }
            }else{
              return {
                ok: false,
                error: "인증에 실패하였습니다."
              }
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message
            };
          }
        } else {
          return {
            ok: false,
            error: "인증할 이메일이 없습니다."
          };
        }
      }
    )
  }
};

export default resolvers;
