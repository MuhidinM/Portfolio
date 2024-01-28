import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
interface SendMessageProps {
  email: string | undefined;
  subject: string | undefined;
  message: string | undefined;
}

export const sendMessage = async ({
  email,
  subject,
  message,
}: SendMessageProps) => {
  const data = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: ["misbahmuhidin@gmail.com"],
    subject: `${subject}`,
    html: `<h3>${email} </h3> <br/> <p>${message}</p>`,
  });
  return data;
};
