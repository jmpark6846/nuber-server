import { Resolvers } from "../../../types/resolvers";
import {
  StartPhoneVerificationMutationArgs,
  StartPhoneVerificationResponse
} from "../../../types/graphql";
import Verification from "../../../entities/Verification";

const resolvers: Resolvers = {
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
      // todo : send sms

    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }
};

export default resolvers;
