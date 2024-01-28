"use server";

import { sendMessage } from "@/lib/mail";
import { EmailSchema } from "@/schemas";
import * as z from "zod";

export const sendEmail = async (values: z.infer<typeof EmailSchema>) => {
  const validatedFields = EmailSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Data!" };
  const { email, subject, message } = validatedFields.data;
await sendMessage({ email, subject, message});
  return { success: "Email sent!" };
};
