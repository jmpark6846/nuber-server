import Twilio from "twilio";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendSMS = (to: string, body: string): Promise<MessageInstance> => {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE
  });
};

export const sendVerificationSMS = (to: string, key: string) =>
  sendSMS(to, `Your verification key is: ${key}`);
