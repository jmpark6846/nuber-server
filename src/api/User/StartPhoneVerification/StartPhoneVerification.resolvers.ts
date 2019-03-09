import { Resolvers } from "../../../types/resolvers";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "../../../types/graphql";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneVerification: async (
      _,
      args: StartPhoneVerificationMutationArgs
    ): Promise<StartPhoneVerificationResponse> => {
      try {
        const { phoneNumber } = args;
        const verification = await Verification.findOne({ payload: phoneNumber });
        if (verification) {
          verification.remove();
        }
        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: "PHONE",
        }).save();
        await sendVerificationSMS(newVerification.payload, newVerification.key)
        return { 
          ok: true,
          error: null
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message
        };
      }
    }  
  }
};

export default resolvers;
