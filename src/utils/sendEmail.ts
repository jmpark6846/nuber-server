import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_PRIVATE_KEY || "",
  domain: process.env.MAILGUN_SANDBOX || ""
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "jmpark6846@naver.com",
    to: "jmpark6846@naver.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullname: string, key: string) => {
  const subject = `${fullname}님 이메일을 인증해주세요.`;
  const body = `<a href="http://nuber.com/verfication/${key}/">이 곳</a>을 클릭해서 이메일을 인증해주세요.`;
  return sendEmail(subject, body);
};
